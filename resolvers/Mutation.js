const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const seed = require('../scripts/seed');
const { AuthenticationError } = require('apollo-server')

const { Workout } = require('../model')

module.exports = {
  seed: seed,


  signup: async (parent, args, context) => {
    return tryQuery(async () => {
      const hashedPassword = await bcrypt.hash(args.password, 10)

      const user = await context.prisma.user.create({
        data: { ...args, password: hashedPassword }
      })

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

      return { token, user }
    })
  },


  login: async (parent, args, context) => {
    return tryQuery(async () => {
      const user = await context.prisma.user.findUnique({ where: { username: args.username } })
      if (!user) return { error: 'Invalid credentials' }

      const passwordIsValid = await bcrypt.compare(args.password, user.password)
      if (!passwordIsValid) return { error: 'Invalid credentials' }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

      return { token, user }
    })
  },


  createWorkout: async (parent, args, context) => {
    const modelArgs = { ...args, userId: context.userId }
    return await Workout.createWorkout(modelArgs)
  },


  updateWorkout: async (parent, args, context) => {
    const modelArgs = { ...args, userId: context.userId }
    return await Workout.updateWorkout(modelArgs)
  },
  
  
  deleteWorkout: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.workout.deleteMany({
        where: {
          userId: context.userId,
          id: Number(args.id)
        }
      })
    })
  },


  addExerciseToWorkout: (parent, args, context) => {
    return tryQuery(async () => {
      // Ensure user can only add exercises to their own workouts
      const assocWorkout = await context.prisma.workout.findFirst({
        where: {
          userId: context.userId,
          id: Number(args.workoutId)
        }
      })

      if (!assocWorkout) throw new AuthenticationError('You are not authenticated. Please log in.')
      
      const newExercise = await context.prisma.exercise.create({
        data: {
          name: args.name,
          reps: args.reps,
          sets: args.sets,
          weight: args.weight,
          unit: args.unit,
          workoutId: Number(args.workoutId)
        }
      })
      
      return newExercise
    })
  },

  
  deleteExercise: (parent, args, context) => {
    return tryQuery(async () => {
      // Ensure user can only delete their own exercises
      const exercise = await context.prisma.exercise.findUnique({
        where: { id: Number(args.id) }
      })
      
      const assocWorkout = await context.prisma.workout.findFirst({
        where: {
          id: exercise.workoutId,
          userId: context.userId
        }
      })

      if (!assocWorkout) throw new AuthenticationError('You are not authenticated. Please log in.')

      return context.prisma.exercise.deleteMany({
        where: { id: Number(args.id) }
      })
    })
  },


  createSession: async (parent, args, context) => {
    return tryQuery(async () => {
      const newSession = await context.prisma.session.create({
        data: {
          userId: context.userId,
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
    })
  },


  completeSession: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.session.updateMany({
        where: {
          userId: context.userId,
          id: Number(args.id)
        },
        data: { completed: true }
      })
    })

  },


  updateSetForExInstance: (parent, args, context) => {
    return tryQuery(async () => {
      // Ensure user can only delete their own exercises
      const exInstance = await context.prisma.exerciseInstance.findUnique({
        where: { id: Number(args.id) }
      })
      
      const assocWorkout = await context.prisma.workout.findFirst({
        where: {
          id: exInstance.workoutId,
          userId: context.userId
        }
      })

      if (!assocWorkout) throw new AuthenticationError('You are not authenticated. Please log in.')

      return context.prisma.exerciseInstance.update({
        where: { id: Number(args.id) },
        data: { setsCompleted: args.setsCompleted }
      })
    })
  },
}