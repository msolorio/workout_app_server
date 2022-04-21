const bcrypt = require('bcryptjs')
const seedData = require('./seedData')
const prisma = require('../prisma')


async function seed(parent, args, context) {
  try {

    // Clear existing records
    await context.prisma.user.deleteMany()
    await context.prisma.workout.deleteMany()
    await context.prisma.exercise.deleteMany()
    await context.prisma.session.deleteMany()
    await context.prisma.exerciseInstance.deleteMany()
    
    // Create users
    const hashedPassword = await bcrypt.hash('1234', 10)

    const firstUser = await context.prisma.user.create({
      data: {
        username: seedData.firstUser.username,
        password: hashedPassword
      }
    })

    // Create workouts
    const workouts = []

    for (let i = 0; i < seedData.workouts.length; i++) {
      
      workoutData = seedData.workouts[i]
      workoutData.userId = Number(firstUser.id)

      const workout = await context.prisma.workout.create({
        data: workoutData
      })

      workouts.push(workout)
    }

    let exercisesResult = []

    for (let i = 0; i < seedData.exercises.length; i++) {
      const exercise = seedData.exercises[i]
      const exerciseData = {
        name: exercise.name,
        reps: exercise.reps,
        sets: exercise.sets,
        weight: exercise.weight,
        unit: exercise.unit,
        workoutId: Number(workouts[exercise.workoutIndex].id)
      }

      const response = await context.prisma.exercise.create({
        data: exerciseData
      })
  
      exercisesResult.push(response)
    }

    // Create sessions
    const sessions = []

    for (let i = 0; i < seedData.sessions.length; i++) {
      const session = seedData.sessions[i]

      const createdSession = await context.prisma.session.create({
        data: {
          workoutId: Number(workouts[session.workoutIndex].id),
          completed: session.completed,
          userId: Number(firstUser.id)
        }
      })

      sessions.push(createdSession)
    }

    // Create exercise instances
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i]

      const exInstancesData = exercisesResult
        .filter((ex) => ex.workoutId === session.workoutId)
        .map((ex) => {
          return {
            exerciseId: ex.id,
            sessionId: session.id,
            setsCompleted: 0,
            repsCompleted: 0
          }
        })
  
      for (let i = 0; i < exInstancesData.length; i++) {
        await context.prisma.exerciseInstance.create({
          data: exInstancesData[i]
        })
      }
    }

    return {
      workouts: workouts,
      sessions: sessions,
      users: [firstUser]
    }
  } catch (err) {
    console.log('Error seeding DB ==>', err);
  }
}

if (require.main === module) {
  seed(null, null, { prisma })
}

module.exports = seed;