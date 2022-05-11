const bcrypt = require('bcryptjs')
const { AuthenticationError } = require('apollo-server')
const seed = require('../scripts/seed')
const setTokenCookie = require('../utils/setTokenCookie')

const {
  Workout,
  Session,
  User,
  Exercise,
  ExerciseInstance
} = require('../model')

module.exports = {
  seed: seed,

  // User Mutations ///////////////////////////////////////////////////
  signup: async (parent, args, context) => {
    const { username, password } = args

    const { token, user, error } = await User.signup(username, password)

    if (error) {
      return { error }
    }

    if (!error) {
      setTokenCookie(context, token)

      return { user }
    }

  },

  
  login: async (parent, args, context) => {
    const { username, password } = args

    const { token, user, error } = await User.login(username, password)

    if (error) {
      return { error }
    }
    
    if (!error) {
      setTokenCookie(context, token)

      return { user }
    }
  },
  
  logout: async (parent, args, context) => {
    context.res.cookie('token', '', {
      httpOnly: true,
      maxAge: 1000
    })

    return {
      error: '',
      success: true
    }
  },

  // Workout Mutations ////////////////////////////////////////////////
  createWorkout: async (parent, args, context) => {
    const modelArgs = {
      ...args,
      userId: context.userId
    }

    const { createdWorkout } = await Workout.createWorkout(modelArgs)

    return createdWorkout
  },


  updateWorkout: async (parent, args, context) => {
    const modelArgs = {
      ...args,
      userId: context.userId
    }

    const { updatedWorkout } = await Workout.updateWorkout(modelArgs)

    return updatedWorkout
  },
  
  
  deleteWorkout: async (parent, args, context) => {
    const { userId } = context
    const workoutId = args.id

    const { count } = await Workout.deleteWorkout(userId, workoutId)
    
    return { count }
  },



  // Exercise Mutations ///////////////////////////////////////////////
  createExercise: async (parent, args, context) => {
    const modelArgs = {
      ...args,
      userId: context.userId
    }

    const { createdExercise } = await Exercise.createExercise(modelArgs)

    return createdExercise
  },

  
  deleteExercise: async (parent, args, context) => {
    const { userId } = context
    const exerciseId = args.id

    const { count } = await Exercise.deleteExercise(userId, exerciseId)

    return { count }
  },



  // Session Mutations ////////////////////////////////////////////////
  createSession: async (parent, args, context) => {
    const { userId } = context
    const { workoutId } = args

    const { createdSession } = await Session.createSession(userId, workoutId)

    return createdSession
  },
  

  completeSession: async (parent, args, context) => {
    const { userId } = context
    const sessionId = args.id

    const { count } = await Session.completeSession(userId, sessionId)

    return { count }
  },
  
  

  // Exercise Instance Mutations //////////////////////////////////////
  updateSetForExInstance: async (parent, args, context) => {
    const modelArgs = {
      userId: context.userId,
      exInstanceId: args.id,
      setsCompleted: args.setsCompleted
    }

    const { exerciseInstance } = await ExerciseInstance.updateSetForExInstance(modelArgs)

    return exerciseInstance
  },
}