const { getBalanceStats, getCategoryStats } = require('../models/Summary');

const summaryResolver = {
  Query: {
    summary: async (_, { from, to }, { currentUser }) => {
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const userId = currentUser.id;

      const balanceStats = await getBalanceStats(userId, from, to);
      const categoryStats = await getCategoryStats(userId, from, to);

      return { balanceStats, categoryStats };
    },
  },
};

module.exports = summaryResolver;
