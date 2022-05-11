"use strict";
const { Workout, ExerciseInstance, User, Session } = require('../model');
module.exports = {
    workout: async (parent) => {
        const { workoutId } = parent;
        return await Workout.getById(workoutId);
    },
    exerciseInstances: async (parent) => {
        const sessionId = parent.id;
        return await ExerciseInstance.getForSession(sessionId);
    },
    user: async (parent) => {
        const { userId } = parent;
        return await User.getById(userId);
    },
    date: (parent) => {
        const sessionObj = parent;
        return Session.getDate(sessionObj);
    }
};
//# sourceMappingURL=Session.js.map