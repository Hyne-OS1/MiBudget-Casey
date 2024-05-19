const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const authenticateUser = (req) => {
    let token = req.headers.authorization || '';
    token = token.replace('Bearer ', '');
    
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Assuming the user information is encoded in the token
    } catch (error) {
        return null
    }
};

function generateToken(user) {
    const token = jwt.sign(
        {
            ...user,
        },
        process.env.JWT_SECRET, // Use your secret key here
        {
            expiresIn: '20d'
        }
    );
    return token;
}

module.exports = { authenticateUser, generateToken };
