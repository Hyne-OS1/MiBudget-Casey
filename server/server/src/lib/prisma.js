// make class with static variable instance for prisma client

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
prisma.$connect().then(() => {
    console.log('Connected to the database');
    }
).catch((e) => {
    console.error('Error connecting to the database: ', e);
});
module.exports = prisma;