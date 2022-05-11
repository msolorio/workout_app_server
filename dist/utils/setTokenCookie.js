"use strict";
function setTokenCookie(context, token) {
    context.res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    });
}
module.exports = setTokenCookie;
//# sourceMappingURL=setTokenCookie.js.map