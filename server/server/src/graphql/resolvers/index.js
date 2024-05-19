// src/graphql/resolvers/index.js

const userResolvers = require('./userSettings');
const historyResolvers = require('./historyPeriods');
const transactionResolvers = require('./transactionHistory');
const summaryResolvers = require('./summary');
const categoryResolvers = require('./categories')
const authResolvers = require('./auth');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...historyResolvers.Query,
    ...transactionResolvers.Query,
    ...summaryResolvers.Query,
    ...categoryResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...transactionResolvers.Mutation,
    ...summaryResolvers.Mutation,
    ...historyResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};

module.exports = resolvers;
