export const Query: {
    info: () => string;
    workouts: (parent: any, args: any, context: any) => Promise<any>;
    workout: (parent: any, args: any, context: any) => Promise<any>;
    session: (parent: any, args: any, context: any) => Promise<any>;
    sessions: (parent: any, args: any, context: any) => Promise<any>;
};
export const Mutation: {
    seed: typeof import("../scripts/seed");
    signup: (parent: any, args: any, context: any) => Promise<{
        error: any;
        user?: undefined;
    } | {
        user: any;
        error?: undefined;
    } | undefined>;
    login: (parent: any, args: any, context: any) => Promise<{
        error: any;
        user?: undefined;
    } | {
        user: any;
        error?: undefined;
    } | undefined>;
    logout: (parent: any, args: any, context: any) => Promise<{
        error: string;
        success: boolean;
    }>;
    createWorkout: (parent: any, args: any, context: any) => Promise<any>;
    updateWorkout: (parent: any, args: any, context: any) => Promise<any>;
    deleteWorkout: (parent: any, args: any, context: any) => Promise<{
        count: any;
    }>;
    createExercise: (parent: any, args: any, context: any) => Promise<any>;
    deleteExercise: (parent: any, args: any, context: any) => Promise<{
        count: any;
    }>;
    createSession: (parent: any, args: any, context: any) => Promise<any>;
    completeSession: (parent: any, args: any, context: any) => Promise<{
        count: any;
    }>;
    updateSetForExInstance: (parent: any, args: any, context: any) => Promise<any>;
};
export const Workout: any;
export const Exercise: {
    workout: (parent: any) => Promise<any>;
    exerciseInstances: (parent: any) => Promise<any>;
};
export const Session: {
    workout: (parent: any) => Promise<any>;
    exerciseInstances: (parent: any) => Promise<any>;
    user: (parent: any) => Promise<any>;
    date: (parent: any) => any;
};
export const ExerciseInstance: {
    exercise: (parent: any) => Promise<any>;
    session: (parent: any) => Promise<any>;
};
