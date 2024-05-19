// models/Summary.js

const prisma = require("../../lib/prisma");

async function getBalanceStats(userId, from, to) {
  const balanceStats = await prisma.transaction.groupBy({
    by: ['type'],
    where: {
      userId,
      date: {
        gte: new Date(from),
        lte: new Date(to),
      },
    },
    _sum: {
      amount: true,
    },
  });

  let endDate = new Date(from);
  endDate.setDate(endDate.getDate() + 30);
  const budget = await prisma.budget.findFirst({
    where: {
      userId,
    },
  })
  const expense = balanceStats.find((stat) => stat.type === 'expense')?._sum.amount || 0;
  const income = balanceStats.find((stat) => stat.type === 'income')?._sum.amount || 0;

  return { expense, income, budget: budget?.amount || 0 };
}

async function getCategoryStats(userId, from, to) {
  const categoryStats = await prisma.transaction.groupBy({
    by: ['category'],
    where: {
      userId,
      date: {
        gte: new Date(from),
        lte: new Date(to),
      },
    },
    _sum: {
      amount: true,
    },
  });

  return categoryStats.map((stat) => ({
    category: stat.category,
    totalAmount: stat._sum.amount || 0,
  }));
}

module.exports = { getBalanceStats, getCategoryStats };
