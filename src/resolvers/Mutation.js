const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')
const seed = require('../scripts/seed')

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
  signup: async (parent, args) => {
    const { username, password } = args

    const { token, user } = await User.signup(username, password)

    context.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    })

    return { token, user }
  },

  
  login: async (parent, args, context) => {
    const { username, password } = args

    const { token, user } = await User.login(username, password)

    context.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    })

    return { token, user }
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

    return await Workout.updateWorkout(modelArgs)
  },
  
  
  deleteWorkout: async (parent, args, context) => {
    const { userId } = context
    const workoutId = args.id

    return await Workout.deleteWorkout(userId, workoutId)
  },



  // Exercise Mutations ///////////////////////////////////////////////
  createExercise: async (parent, args, context) => {
    const modelArgs = {
      ...args,
      userId: context.userId
    }

    return await Exercise.createExercise(modelArgs)
  },

  
  deleteExercise: async (parent, args, context) => {
    const { userId } = context
    const exerciseId = args.id

    return await Exercise.deleteExercise(userId, exerciseId)
  },



  // Session Mutations ////////////////////////////////////////////////
  createSession: async (parent, args, context) => {
    const { userId } = context
    const { workoutId } = args

    return await Session.createSession(userId, workoutId)
  },
  

  completeSession: async (parent, args, context) => {
    const { userId } = context
    const sessionId = args.id

    return await Session.completeSession(userId, sessionId)
  },
  
  

  // Exercise Instance Mutations //////////////////////////////////////
  updateSetForExInstance: async (parent, args, context) => {
    const modelArgs = {
      userId: context.userId,
      exInstanceId: args.id,
      setsCompleted: args.setsCompleted
    }

    return await ExerciseInstance.updateSetForExInstance(modelArgs)
  },
}