const prisma = require("../../lib/prisma");

// models/History.js
async function getHistoryPeriods(userId) {
  const result = await prisma.transaction.findMany({
    where: {
      userId,
    },
    select: {
      date: true,
    },
    distinct: ['date'],
    orderBy: {
      date: 'asc',
    },
  });

  const years = result.map((transaction) => new Date(transaction.date).getFullYear());

  return Array.from(new Set(years));
}

module.exports = { getHistoryPeriods };
