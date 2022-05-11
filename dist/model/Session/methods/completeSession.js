"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query(userId, sessionId) {
    const countObj = prisma.session.updateMany({
        where: {
            userId: userId,
            id: Number(sessionId)
        },
        data: { completed: true }
    });
    return countObj;
}
const completeSession = createHandledQuery(query);
module.exports = completeSession;
//# sourceMappingURL=completeSession.js.map