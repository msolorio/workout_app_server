const handledQuery = require('../../handledQuery')

// Pass in only the data the function needs
const createWorkout = handledQuery(async (parent, args, context) => {
  const newWorkout = await context.prisma.workout.create({
    data: {
      name: args.name,
      description: args.description,
      length: args.length,
      location: args.location,
      userId: Number(context.userId)
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
})

module.exports = createWorkout
