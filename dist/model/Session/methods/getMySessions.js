"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query(userId) {
    return prisma.session.findMany({ where: { userId } });
}
const getMySessions = createHandledQuery(query);
module.exports = getMySessions;
//# sourceMappingURL=getMySessions.js.map