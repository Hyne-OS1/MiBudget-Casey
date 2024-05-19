// models/UserSettings.js

const prisma = require("../../lib/prisma");

async function updateUserSettings(id, currency, name) {
    await prisma.userSettings.update({
        where: { id },
        data: {
            currency,
            name: name || "Test User",
        },
    });
}

async function getUserSettings(id) {
    return await prisma.userSettings.findUnique({ where: { id } });
}

async function createUser(user) {
    console.log(user);
    return await prisma.userSettings.create({
        data: {
            ...user
        }
    });

}
module.exports = { updateUserSettings, getUserSettings, createUser };
