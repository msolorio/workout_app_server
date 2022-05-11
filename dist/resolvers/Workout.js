"use strict";
const mdl = require('../model');
module.exports = {
    exercises: async (parent) => {
        const workoutId = parent.id;
        return await mdl.Exercise.getForWorkout(workoutId);
    },
    sessions: async (parent) => {
        const workoutId = parent.id;
        return await mdl.Session.getForWorkout(workoutId);
    },
    user: async (parent) => {
        const { userId } = parent;
        return await mdl.User.getById(userId);
    }
};
//# sourceMappingURL=Workout.js.map