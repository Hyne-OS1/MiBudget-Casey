const { getHistoryPeriods } = require('../models/History');

const historyPeriodsResolver = {
  Query: {
    historyPeriods: async (_, __, { currentUser }) => {
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const userId = currentUser.id;

      const historyPeriods = await getHistoryPeriods(userId);

      return historyPeriods;
    },
  },
};

module.exports = historyPeriodsResolver;
