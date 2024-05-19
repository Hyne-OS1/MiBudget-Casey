// schema.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    summary(from: String!, to: String!): Summary!
    historyPeriods: [Int!]!
    transactionHistory(from: String!, to: String!): [Transaction!]!
    getUserSettings(id: String!): UserSettings!
    getAllCategories: [Category!]!
  }

  type Mutation {
    updateUserSettings(id: String!, currency: String!, name: String!): UserSettings!
    createTransaction(input: CreateTransactionInput!): Transaction!
    deleteTransaction(id: ID!): String!
    createCategory(input: CreateCategoryInput!): Category!
    deleteCategory(name: String!, type: String!): UserSettings!
    createUser(user: UserSettingsInput): UserSettings!
    login(email: String!, password: String!): String!
    addBudget(input: AddBudgetInput!): Budget!
  }

  type Summary {
    balanceStats: BalanceStats!
    categoryStats: [CategoryStats!]!
  }

  type BalanceStats {
    expense: Float!
    income: Float!
    budget: Float!
  }

  type CategoryStats {
    category: String!
    totalAmount: Float!
  }

  type Transaction {
    id: ID!
    amount: Float!
    description: String!
    date: String!
    type: String!
    category: String!
  }

  type UserSettings {
    id: ID!
    name: String!
    currency: String!
    email: String!
    password: String!
  }
  
  type Budget {
    id: ID!
    amount: Float!
    userId: String
    startDate: String
    endDate: String
  }

  type Category {
    name: String!
    icon: String!
    type: String!
  }

  input CreateTransactionInput {
    amount: Float!
    description: String!
    date: String!
    category: String!
    type: String
  }
  
  input CreateCategoryInput {
    name: String!
    icon: String!
    type: String!
  }

  input UserSettingsInput {
    name: String!
    currency: String!
    email: String!
    password: String!
  }

  input AddBudgetInput {
    amount: Float!
    startDate: String!
    endDate: String!
  }
`;

module.exports = typeDefs;
