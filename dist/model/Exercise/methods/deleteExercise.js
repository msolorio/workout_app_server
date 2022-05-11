"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query(userId, exerciseId) {
    const numExId = Number(exerciseId);
    // Ensure user can only delete their own exercises
    const exercise = await prisma.exercise.findUnique({
        where: { id: numExId }
    });
    const assocWorkout = await prisma.workout.findFirst({
        where: {
            userId,
            id: exercise.workoutId
        }
    });
    if (!assocWorkout)
        throw new AuthenticationError('You are not authenticated. Please log in.');
    const countObj = prisma.exercise.deleteMany({
        where: { id: numExId }
    });
    return countObj;
}
const deleteExercise = createHandledQuery(query);
module.exports = deleteExercise;
//# sourceMappingURL=deleteExercise.js.map