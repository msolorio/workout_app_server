const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(userId, workoutId) {
  const newSession = await prisma.session.create({
    data: {
      userId: userId,
      workoutId: Number(workoutId),
      completed: false
    }
  })

  // Get Exercises included in associated workout
  const exercises = await prisma.exercise.findMany({
    where: { workoutId: Number(workoutId) }
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

  await prisma.exerciseInstance.createMany({
    data: exerciseInstances
  })

  return newSession
}

const createSession = createHandledQuery(query)

module.exports = createSession
