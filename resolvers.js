const seed = require('./seed');

const resolvers = {
  Query: {
    info: () => 'This is the info',


    workouts: (parent, args, context) => {
      return context.prisma.workout.findMany();
    },


    workout: (parent, args, context) => {
      return context.prisma.workout.findUnique({
        where: { id: Number(args.id) }
      });
    },

    exercise: (parent, args, context) => {
      return context.prisma.exercise.findUnique({
        where: { id: Number(args.id) }
      });
    }
  },


  Mutation: {
    seed: seed,

    createWorkout: async (parent, args, context) => {
      const newWorkout = await context.prisma.workout.create({
        data: {
          name: args.name,
          description: args.description,
          length: args.length,
          location: args.location
        }
      });

      const formattedExercises = args.exercises?.map(ex => {
        ex.workoutId = Number(newWorkout.id);
        return ex;
      }) || [];

      await context.prisma.exercise.createMany({
        data: formattedExercises
      });

      return newWorkout;
    },
    
    
    deleteWorkout: (parent, args, context) => {
      return context.prisma.workout.delete({
        where: { id: Number(args.id) }
      });
    },


    addExerciseToWorkout: (parent, args, context) => {
      try {
        const newExercise = context.prisma.exercise.create({
          data: {
            name: args.name,
            reps: args.reps,
            sets: args.sets,
            weight: args.weight,
            unit: args.unit,
            // TODO: can update to workoutId: Number(args.workoutId)
            workout: { connect: { id: Number(args.workoutId) } }
          }
        });
  
        return newExercise;
      } catch (err) {
        console.log("error in addExerciseToWorkout:", err);

        return { status: 500, errorMessage: 'Something went wrong. Please try again' };
      }
    },

    deleteExercise: (parent, args, context) => {
      return context.prisma.exercise.delete({
        where: { id: Number(args.id) }
      });
    }
  },


  Workout: {
    exercises: (parent, args, context) => {
      return context.prisma.workout.findUnique({ where: { id: parent.id } }).exercises();
    }
  },


  Exercise: {
    workout: (parent, args, context) => {
      return context.prisma.exercise.findUnique({ where: { id: parent.id } }).workout();
    }
  }
}

module.exports = resolvers;
