const { updateUserSettings, createUser, getUserSettings } = require('../models/UserSettings');

const userSettingsResolver = {
  Query: {
    getUserSettings: async (_, { id }) => {
      return await getUserSettings(id);
    },
  },

  Mutation: {
    updateUserSettings: async (_, { currency }, { currentUser }) => {
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const id = currentUser.id;
      const name = currentUser.name;

      await updateUserSettings(id, currency, name);

      return { id, currency, name };
    },

    createUser: async (_, { user }) => {
      console.log(user);
      return await createUser(user);
    },
  },
};

module.exports = userSettingsResolver;
