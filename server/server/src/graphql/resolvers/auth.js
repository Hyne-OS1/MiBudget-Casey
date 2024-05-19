const prisma = require("../../lib/prisma");
const { generateToken } = require("../../middelware/auth");

// src/auth/authResolvers.js
async function login(email, password) {
  const user = await prisma.userSettings.findFirst({ where: { email } });

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = generateToken(user);

  // Return token to user
  return token;
}

async function signup(email, password, otherSignupData) {
  // Create user account
  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      ...otherSignupData,
    },
  });

  // Generate JWT token
  const token = generateToken(newUser);

  // Return token to user
  return { token };
}

const authResolvers = {
  Mutation: {
    login: async (_, { email, password }) => {
      return await login(email, password);
    },
  },
};

module.exports = authResolvers;
