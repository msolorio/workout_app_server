"use strict";
const prisma = require('../../../prisma');
const createHandledQuery = require('../../../utils/createHandledQuery');
async function query({ name, description, length, location, exercises, userId }) {
    const createdWorkout = await prisma.workout.create({
        data: {
            name: name,
            description: description,
            length: length,
            location: location,
            userId: Number(userId)
        }
    });
    if (exercises) {
        const formattedExercises = exercises.map(ex => {
            ex.workoutId = Number(createdWorkout.id);
            return ex;
        });
        await prisma.exercise.createMany({
            data: formattedExercises
        });
    }
    return { createdWorkout };
}
const createWorkout = createHandledQuery(query);
module.exports = createWorkout;
//# sourceMappingURL=createWorkout.js.map