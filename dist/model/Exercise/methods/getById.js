"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query(exerciseId) {
    return prisma.exercise.findUnique({ where: { id: exerciseId } });
}
const getById = createHandledQuery(query);
module.exports = getById;
//# sourceMappingURL=getById.js.map