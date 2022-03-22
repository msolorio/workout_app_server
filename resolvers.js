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
    },


    session: (parent, args, context) => {
      return context.prisma.session.findUnique({
        where: { id: Number(args.id) }
      })
    },

    sessions: (parent, args, context) => {
      return context.prisma.session.findMany()
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

    updateWorkout: async (parent, args, context) => {
      const updatedWorkout = await context.prisma.workout.update({
        where: { id: Number(args.id) },
        data: {
          name: args.name,
          description: args.description,
          length: args.length,
          location: args.location
        }
      })

      const exercises = args.exercises || []

      
      for (let i = 0; i < exercises.length; i++) {
        const exercise = exercises[i]

        // upsert - updates exercise if one with id found
        // otherwise create exercise
        await context.prisma.exercise.upsert({
          where: { id: Number(exercise.id) || -1 },
          update: {
            name: exercise.name,
            reps: exercise.reps,
            sets: exercise.sets,
            weight: exercise.weight,
            unit: exercise.unit
          },
          create: {
            name: exercise.name,
            reps: exercise.reps,
            sets: exercise.sets,
            weight: exercise.weight,
            unit: exercise.unit,
            workoutId: Number(updatedWorkout.id)
          }
        })
      }

      const exsFromDb = await context.prisma.exercise.findMany({
        where: { workoutId: Number(updatedWorkout.id) }
      })

      // If an exercise in db is not found in exercise data from client
      // delete exercise
      for (let i = 0; i < exsFromDb.length; i++) {
        const exFromDbId = exsFromDb[i].id

        const exFound = exercises.map(ex => Number(ex.id)).includes(exFromDbId)

        if (!exFound) {
          await context.prisma.exercise.delete({
            where: { id: Number(exFromDbId) }
          })
        }
      }

      return updatedWorkout
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
            workoutId: Number(args.workoutId)
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
    },

    createSession: async (parent, args, context) => {
      const newSession = await context.prisma.session.create({
        data: {
          workoutId: Number(args.workoutId),
          completed: false
        }
      })

      // Get Exercises included in associated workout
      const exercises = await context.prisma.exercise.findMany({
        where: { workoutId: Number(args.workoutId) }
      })

      // Cretae ExerciseInstance for each exercise
      const exerciseInstances = exercises.map((ex) => {
        return {
          exerciseId: ex.id,
          sessionId: newSession.id,
          setsCompleted: 0,
          repsCompleted: 0
        }
      })

      await context.prisma.exerciseInstance.createMany({
        data: exerciseInstances
      })

      return newSession
    },

    completeSession: (parent, args, context) => {
      return context.prisma.session.update({
        where: { id: Number(args.id) },
        data: { completed: true }
      })
    },

    updateSetForExInstance: (parent, args, context) => {
      return context.prisma.exerciseInstance.update({
        where: { id: Number(args.id) },
        data: { setsCompleted: args.setsCompleted }
      })
    },

    updateRepsForExInstance: (parent, args, context) => {
      return context.prisma.exerciseInstance.update({
        where: { id: Number(args.id) },
        data: { repsCompleted: args.repsCompleted }
      })
    }
  },


  Workout: {
    exercises: (parent, args, context) => {
      return context.prisma.workout.findUnique({ where: { id: parent.id } }).exercises();
    },

    sessions: (parent, args, context) => {
      return context.prisma.workout.findUnique({ where: { id: parent.id }}).sessions()
    }
  },


  Exercise: {
    workout: (parent, args, context) => {
      return context.prisma.exercise.findUnique({ where: { id: parent.id } }).workout();
    },
    
    exerciseInstances: (parent, args, context) => {
      return context.prisma.exercise.findUnique({ where: { id: parent.id } }).exerciseInstances();
    }
  },


  Session: {
    workout: (parent, args, context) => {
      return context.prisma.session.findUnique({ where: { id: parent.id } }).workout()
    },

    exerciseInstances: (parent, args, context) => {
      return context.prisma.session.findUnique({ where: { id: parent.id } }).exerciseInstances()
    },

    date: (parent, args, context) => {
      return parent.createdAt
    }
  },


  ExerciseInstance: {
    exercise: (parent, args, context) => {
      return context.prisma.exerciseInstance.findUnique({ where: { id: parent.id }}).exercise()
    },

    session: (parent, args, context) => {
      return context.prisma.exerciseInstance.findUnique({ where: { id: parent.id } }).session()
    }
  }
}

module.exports = resolvers;
