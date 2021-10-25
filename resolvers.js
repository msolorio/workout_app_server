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

    set: (parent, args, context) => {
      return context.prisma.set.findUnique({
        where: { id: Number(args.id) }
      });
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
    
    
    deleteWorkout: (parent, args, context) => {
      return context.prisma.workout.delete({
        where: { id: Number(args.id) }
      });
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
    },

    deleteSet: (parent, args, context) => {
      return context.prisma.set.delete({
        where: { id: Number(args.id) }
      });
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
