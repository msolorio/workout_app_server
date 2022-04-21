const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query({
  userId,
  workoutId,
  name,
  reps,
  sets,
  weight,
  unit  
}) {
  const numWorkoutId = Number(workoutId)

  // Ensure user can only add exercises to their own workouts
  const assocWorkout = await prisma.workout.findFirst({
    where: {
      userId,
      id: numWorkoutId
    }
  })

  if (!assocWorkout) throw new AuthenticationError('No workout found for that user.')

  const newExercise = await prisma.exercise.create({
    data: {
      name,
      reps,
      sets,
      weight,
      unit,
      workoutId: numWorkoutId
    }
  })

  return newExercise
}

const createExercise = createHandledQuery(query)

module.exports = createExercise
