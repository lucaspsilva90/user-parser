/* eslint-disable max-len */
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

      const parsedUsers = await PromisePool
        .for(flatUsers)
        .withConcurrency(1)
        .process(async (user) => {
          const userId = Number(user.id._text);

          const addressInfo = await services.linkApi.getUserAdressesById(userId);
          const contactInfo = await services.linkApi.getUserContactsById(userId);

          await limiter.removeTokens(2);

          const buildAddress = (address) => {
            if (!address.data.item) return null;
            if (address.data.item && address.data.item.length > 0) return address.data.item[0].street._text;
            return address.data.item.street._text;
          };

          const buildAddressNumber = (address) => {
            if (!address.data.item) return null;
            if (address.data.item && address.data.item.length > 0) return address.data.item[0].number._text;
            return address.data.item.number._text;
          };

          const buildPhoneNumber = (contacts) => {
            if (!contacts.data.item) return null;
            if (contacts.data.item && contacts.data.item.length > 0) return contacts.data.item[0].phoneNumber._text;
            return contacts.data.item.phoneNumber._text;
          };

          return {
            _id: user.id._text,
            fullName: `${user.firstName._text} ${user.lastName._text}`,
            email: user.email._text,
            address: buildAddress(addressInfo),
            addressNumber: buildAddressNumber(addressInfo),
            phoneNumber: buildPhoneNumber(contactInfo),
            created_at: Date.now(),
          };
        });

      await mongo.connect(config.db.url, config.db.name);

      const saveUsersToDb = (usersToBeSaved) => {
        const results = PromisePool
          .for(usersToBeSaved)
          .withConcurrency(5)
          .process(async (user) => {
            await repository.User.createOrUpdateWithWhere({ _id: user._id }, { $set: user });
          });
        return results;
      };

      await saveUsersToDb(parsedUsers.results);

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
