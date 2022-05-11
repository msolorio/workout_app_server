export = seed;
declare function seed(parent: any, args: any, context: any): Promise<{
    workouts: import(".prisma/client").Workout[];
    sessions: import(".prisma/client").Session[];
    users: import(".prisma/client").User[];
} | undefined>;
