"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query(userId, sessionId) {
    return prisma.session.findFirst({
        where: { userId, id: Number(sessionId) }
    });
}
const getMySession = createHandledQuery(query);
module.exports = getMySession;
//# sourceMappingURL=getMySession.js.map