// models/Transaction.js

const prisma = require("../../lib/prisma");

async function getTransactionHistory(userId, from, to) {
    const transactionHistory = await prisma.transaction.findMany({
        where: {
            userId,
            date: {
                gte: new Date(from),
                lte: new Date(to),
            },
        },
        orderBy: {
            date: 'desc',
        },
    });

    return transactionHistory;
}

async function createTransaction(data) {
    return await prisma.transaction.create({ data });
}
async function deleteTransaction(id) {
    // Delete transaction
    // remove expense from budget

    return await prisma.transaction.delete({ where: { id } });
}

async function addBudget(data) {
    let start = new Date(data.startDate);
    let end = new Date(data.endDate);

    await prisma.budget.deleteMany()
    const existingBudget = await prisma.budget.findFirst({
        where: {
            AND: [
                { userId: data.userId },
                { startDate: { lte: start } },
                { endDate: { gte: end } }
            ]
        }
    });

    if (existingBudget) {
        console.log('Updating existing budget');
        // Update existing budget
        return prisma.budget.update({
            where: { id: existingBudget.id },
            data: { amount: data.amount },
        });
    } else {
        // Create new budget
        return prisma.budget.create({ data });
    }
}


async function deleteBudget(id) {
    return await prisma.budget.delete({ where: { id } });
}

async function getBudgets(userId) {
    return await prisma.budget.findMany({
        where: {
            userId,
            mo
        },
    });
}


module.exports = {
    getTransactionHistory,
    createTransaction,
    deleteTransaction,
    addBudget,
    deleteBudget,
    getBudgets
};
