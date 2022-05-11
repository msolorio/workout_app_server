"use strict";
const jwt = require('jsonwebtoken');
function generateToken(userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "24h"
    });
    return { token };
}
module.exports = generateToken;
//# sourceMappingURL=generateToken.js.map