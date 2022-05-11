export namespace firstUser {
    const username: string;
}
export const workouts: {
    name: string;
    description: string;
    length: number;
    location: string;
}[];
export const exercises: ({
    name: string;
    reps: number;
    sets: number;
    weight: number;
    unit: string;
    workoutIndex: number;
} | {
    name: string;
    reps: number;
    sets: number;
    workoutIndex: number;
    weight?: undefined;
    unit?: undefined;
})[];
export const sessions: {
    workoutIndex: number;
    completed: boolean;
}[];
