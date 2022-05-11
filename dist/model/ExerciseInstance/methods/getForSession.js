"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query(sessionId) {
    return prisma.exerciseInstance.findMany({
        where: { sessionId }
    });
}
const getExInstancesForSession = createHandledQuery(query);
module.exports = getExInstancesForSession;
//# sourceMappingURL=getForSession.js.map