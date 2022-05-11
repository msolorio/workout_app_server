"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query({ userId, exInstanceId, setsCompleted }) {
    const numExInstanceId = Number(exInstanceId);
    // Ensure user can only update their own exercise instances
    const exInstance = await prisma.exerciseInstance.findUnique({
        where: { id: numExInstanceId }
    });
    const assocWorkout = await prisma.workout.findFirst({
        where: {
            id: exInstance.workoutId,
            userId: userId
        }
    });
    if (!assocWorkout)
        throw new AuthenticationError('You are not authenticated. Please log in.');
    const exerciseInstance = await prisma.exerciseInstance.update({
        where: { id: numExInstanceId },
        data: { setsCompleted }
    });
    return { exerciseInstance };
}
const updateSetForExInstance = createHandledQuery(query);
module.exports = updateSetForExInstance;
//# sourceMappingURL=updateSetForExInstance.js.map