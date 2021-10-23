// const { PrismaClient } = require('@prisma/client');

const workouts = [
  {
    id: '1',
    date: '2021/10/20',
    description: 'this is a description',
    length: 60,
    location: 'home'
  },
  {
    id: '2',
    date: '2021/10/21',
    description: 'this is a description',
    length: 60,
    location: 'gym'
  },
  {
    id: '3',
    date: '2021/10/22',
    description: 'this is a description',
    length: 60,
    location: 'park'
  },
];

// const sets = [
//   {
//     id: '1',
//     exercise: 'bicep curl',
//     reps: 10,
//     workoutId: '1'
//   },
//   {
//     id: '2',
//     exercise: 'bicep curl',
//     reps: 9,
//     workoutId: '2'
//   },
//   {
//     id: '3',
//     exercise: 'pull ups',
//     reps: 5,
//     workoutId: '2'
//   },
//   {
//     id: '4',
//     exercise: 'pull ups',
//     reps: 5,
//     workoutId: '3'
//   },
// ]

// =========================================================
// TODO: Add functionality to delete a workout
// - include cascading deletes
// - delete the sets associated with the workout
// =========================================================

const resolvers = {
  Query: {
    info: () => 'This is the info',
    workouts: (parent, args, context) => {
      return context.prisma.workout.findMany();
    }
  },

  Mutation: {
    createWorkout: (parent, args, context) => {
      const newWorkout = context.prisma.workout.create({
        data: {
          date: args.date,
          description: args.description,
          length: args.length,
          location: args.location
        }
      });

      return newWorkout;
    },

    addSetToWorkout: (parent, args, context) => {
      const newSet = context.prisma.set.create({
        data: {
          exercise: args.exercise,
          reps: args.reps,
          workout: { connect: { id: Number(args.workoutId) } }
        }
      });

      return newSet;
    }
  },

  Workout: {
    sets: (parent, args, context) => {
      return context.prisma.workout.findUnique({ where: { id: parent.id } }).sets();
    }
  },

  Set: {
    workout: (parent, args, context) => {
      return context.prisma.set.findUnique({ where: { id: parent.id } }).workout();
    }
  }
}

module.exports = resolvers;
