const prisma = require("../../lib/prisma");

async function createCategory(data) {
    return await prisma.category.create({
        data: {
            name: data.input?.name,
            userId: data.userId,
            type: data.input?.type,
            icon: data.input?.icon,
        },
     });
}

async function deleteCategory(name, userId, type) {
    return await prisma.category.delete({ where: { name_userId_type: { name, userId, type } } });
}

async function getAllCategories(userId) {
    return await prisma.category.findMany({ where: { userId } });
}

module.exports = {
    createCategory,
    deleteCategory,
    getAllCategories,
};
