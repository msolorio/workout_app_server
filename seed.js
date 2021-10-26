async function seed(parent, args, context) {

  try {
    await context.prisma.workout.deleteMany();
    
    await context.prisma.exercise.deleteMany();
    
    // Create workouts individually in order to access ids later
    const firstWorkout = await context.prisma.workout.create({
      data: {
        name: 'Tourmaline Surf Sesh',
        description: 'Great beginner spot - easy to catch waves',
        location: 'Tourmaline Surf Park'
      }
    });

    const secondWorkout = await context.prisma.workout.create({
      data: {
        name: 'Marsh Workout',
        description: 'Marsh by my house',
        length: 120,
        location: 'Famosa Slough'
      }
    });

    const thirdWorkout = await context.prisma.workout.create({
      data: {
        name: 'Gym Workout',
        description: 'pumping iron at the place down the street',
        length: 120,
        location: 'Point Loma Gym'
      }
    });

    await context.prisma.exercise.createMany({
      data: [
        {
          name: 'Leg stretches',
          reps: 10,
          workoutId: Number(firstWorkout.id)
        },
        {
          name: 'Stand ups',
          reps: 10,
          workoutId: Number(firstWorkout.id)
        },
        {
          name: 'Paddle Sprints',
          reps: 2,
          workoutId: Number(firstWorkout.id)
        },
        {
          name: 'Push ups',
          reps: 20,
          sets: 3,
          workoutId: Number(secondWorkout.id)
        },
        {
          name: 'Upsidedown Shoulder Press',
          reps: 15,
          sets: 3,
          workoutId: Number(secondWorkout.id)
        },
        {
          name: 'Squats',
          reps: 10,
          sets: 3,
          workoutId: Number(secondWorkout.id)
        }
      ]
    });
  
    return "Successfully seeded DB";
  } catch (err) {
    console.log('Error seeding DB ==>', err);
  }
}

module.exports = seed;