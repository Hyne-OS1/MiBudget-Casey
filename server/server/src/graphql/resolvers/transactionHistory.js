const { getTransactionHistory, createTransaction, deleteTransaction, addBudget } = require('../models/Transaction');
const { getUserSettings } = require('../models/UserSettings');

const transactionHistoryResolver = {
    Query: {
        transactionHistory: async (_, { from, to }, { currentUser }) => {
            if (!currentUser) {
                throw new Error('User not authenticated');
            }

            const userId = currentUser.id;

            const transactionHistory = await getTransactionHistory(userId, from, to);

            return transactionHistory;
        },
    },
    Mutation: {
        createTransaction: async (_, { input }, { currentUser }) => {
            if (!currentUser) {
                throw new Error('User not authenticated');
            }

            console.log(currentUser, input);
            let transaction = await createTransaction({
                ...input,
                userId: currentUser.id,
            });

            return transaction;
        },
        deleteTransaction: async (_, { id }, { currentUser }) => {
            if (!currentUser) {
                throw new Error('User not authenticated');
            }

            await deleteTransaction(id);
            return 'Transaction deleted';
        },
        addBudget: async (_, { input }, { currentUser }) => {
            if (!currentUser) {
                throw new Error('User not authenticated');
            }

            console.log(currentUser, input);
            let budget = await addBudget({
                ...input,
                userId: currentUser.id,
            });

            return budget;
        },
    },
};

module.exports = transactionHistoryResolver;
