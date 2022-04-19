const userWrapper = ({
    config,
    repository,
    mongo,
    CustomError,
  }) => {
    const parseUserToDb = async ({
      onSuccess,
      onError,
    }) => {
      try {
        await mongo.connect(config.db.url, config.db.name);
        const response = await repository.User.find({}, { projection: { password: 0 } });
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
  