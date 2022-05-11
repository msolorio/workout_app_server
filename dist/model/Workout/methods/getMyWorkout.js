"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query(userId, workoutId) {
    return prisma.workout.findFirst({
        where: { userId, id: Number(workoutId) }
    });
}
const getMyWorkout = createHandledQuery(query);
module.exports = getMyWorkout;
//# sourceMappingURL=getMyWorkout.js.map