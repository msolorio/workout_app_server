"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query(sessionId) {
    return prisma.session.findUnique({ where: { id: sessionId } });
}
const getById = createHandledQuery(query);
module.exports = getById;
//# sourceMappingURL=getById.js.map