"use strict";
const jwt = require('jsonwebtoken');
async function verifyAuth(token) {
    if (!token)
        return false;
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken.userId) {
            return false;
        }
        return decodedToken.userId;
    }
    catch (err) {
        return false;
    }
}
module.exports = verifyAuth;
//# sourceMappingURL=verifyAuth.js.map