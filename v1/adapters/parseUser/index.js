/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */

const userWrapper = ({
  config,
  repository,
  mongo,
  services,
  RateLimiter,
  PromisePool,
}) => {
  const parseUserToDb = async ({
    onSuccess,
    onError,
  }) => {
    try {
      const users = [];

      const limiter = new RateLimiter({ tokensPerInterval: 20, interval: 'minute' });

      const firstResponse = await services.linkApi.getUsers(10, 1);
      users.push(firstResponse.data.usersList.item);
      await limiter.removeTokens(1);

      for (let page = 2; page <= Number(firstResponse.data.pagination.limit._text); page += 1) {
        const response = await services.linkApi.getUsers(10, page);
        await limiter.removeTokens(1);
        users.push(response.data.usersList.item);
      }

      const flatUsers = users.flatMap((usersToBeParsed) => usersToBeParsed);

      const { results } = await PromisePool
        .for(flatUsers)
        .withConcurrency(1)
        .process(async (user) => {
          const userId = Number(user.id._text);

          const addressInfo = await services.linkApi.getUserAdressesById(userId);
          const contactInfo = await services.linkApi.getUserContactsById(userId);

          await limiter.removeTokens(2);

          const buildAddress = (address) => address.data.item.street._text
            || address.data.item[0].street._text;

          const buildAddressNumber = (address) => address.data.item.number._text
            || address.data.item[0].number._text;

          const buildPhoneNumber = (contacts) => contacts.data.item.phoneNumber._text
            || contacts.data.item[0].phoneNumber._text;

          return {
            fullName: `${user.firstName._text} ${user.lastName._text}`,
            email: user.email._text,
            address: buildAddress(addressInfo),
            addressNumber: buildAddressNumber(addressInfo),
            phoneNumber: buildPhoneNumber(contactInfo),
          };
        });

      await mongo.connect(config.db.url, config.db.name);

      await repository.User.bulkInsert(results);

      const response = {
        status: 200,
        message: 'Proccess Finalized with no errors!',
      };

      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

  return {
    parseUserToDb,
  };
};

module.exports = userWrapper;
