const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

// Return signed JWT from user data

function createToken(user){
    console.assert(user.isAdmin !== undefined, "createtoken passed user without isAdmin property");

    let payload = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin || false
    };

    return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };