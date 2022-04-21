const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query({
  name,
  description,
  length,
  location,
  exercises,
  userId
}) {

  const newWorkout = await prisma.workout.create({
    data: {
      name: name,
      description: description,
      length: length,
      location: location,
      userId: Number(userId)
    }
  })

  const formattedExercises = exercises?.map(ex => {
    ex.workoutId = Number(newWorkout.id);
    return ex;
  })

  if (formattedExercises) {
    await prisma.exercise.createMany({
      data: formattedExercises
    })
  }

  return newWorkout;
}


const createWorkout = createHandledQuery(query)

module.exports = createWorkout
