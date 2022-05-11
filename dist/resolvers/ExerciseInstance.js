"use strict";
const { Exercise, Session } = require('../model');
module.exports = {
    exercise: async (parent) => {
        const { exerciseId } = parent;
        return await Exercise.getById(exerciseId);
    },
    session: async (parent) => {
        const { sessionId } = parent;
        return await Session.getById(sessionId);
    }
};
//# sourceMappingURL=ExerciseInstance.js.map