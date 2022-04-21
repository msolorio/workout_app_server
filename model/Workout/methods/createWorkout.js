const { PrismaClient } = require('@prisma/client');
const handledQuery = require('../../handledQuery')
const prisma = new PrismaClient()

// Pass in only the data the function needs
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


const createWorkout = handledQuery(query)

module.exports = createWorkout
