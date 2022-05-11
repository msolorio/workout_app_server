"use strict";
const { Workout, ExerciseInstance } = require('../model');
const Exercise = {
    workout: async (parent) => {
        const { workoutId } = parent;
        return await Workout.getById(workoutId);
    },
    exerciseInstances: async (parent) => {
        const exerciseId = parent.id;
        return await ExerciseInstance.getForExercise(exerciseId);
    }
};
module.exports = Exercise;
//# sourceMappingURL=Exercise.js.map