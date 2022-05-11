import seed = require("../scripts/seed");
export { seed };
export declare function signup(parent: any, args: any, context: any): Promise<{
    error: any;
    user?: undefined;
} | {
    user: any;
    error?: undefined;
} | undefined>;
export declare function login(parent: any, args: any, context: any): Promise<{
    error: any;
    user?: undefined;
} | {
    user: any;
    error?: undefined;
} | undefined>;
export declare function logout(parent: any, args: any, context: any): Promise<{
    error: string;
    success: boolean;
}>;
export declare function createWorkout(parent: any, args: any, context: any): Promise<any>;
export declare function updateWorkout(parent: any, args: any, context: any): Promise<any>;
export declare function deleteWorkout(parent: any, args: any, context: any): Promise<{
    count: any;
}>;
export declare function createExercise(parent: any, args: any, context: any): Promise<any>;
export declare function deleteExercise(parent: any, args: any, context: any): Promise<{
    count: any;
}>;
export declare function createSession(parent: any, args: any, context: any): Promise<any>;
export declare function completeSession(parent: any, args: any, context: any): Promise<{
    count: any;
}>;
export declare function updateSetForExInstance(parent: any, args: any, context: any): Promise<any>;
