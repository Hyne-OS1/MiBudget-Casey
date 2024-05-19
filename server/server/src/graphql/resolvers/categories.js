const { createCategory, getAllCategories } = require("../models/Category");
const { getUserSettings } = require("../models/UserSettings");

const categoriesResolver = {
  Mutation: {
    createCategory: async (_, input, { currentUser }) => {
      if (!currentUser) {
        throw new Error("User not authenticated");
      }

      let category = await createCategory({ ...input, userId: currentUser.id });
      return category;
    },
    deleteCategory: async (_, { name, type }, { currentUser }) => {
      await deleteCategory(name, currentUser.id, type);
      const userSettings = await getUserSettings(currentUser.id);
      return userSettings;
    },
  },

  Query: {
    getAllCategories: async (_, data, { currentUser }) => {
      console.log(currentUser, data);
      if (!currentUser) {
        throw new Error("User not authenticated");
      }

      return await getAllCategories(currentUser.id);
    },
  }
};

module.exports = categoriesResolver;