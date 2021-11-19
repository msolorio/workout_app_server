async function seed(parent, args, context) {
  try {

    // Clear existing records
    await context.prisma.workout.deleteMany()
    await context.prisma.exercise.deleteMany()
    await context.prisma.session.deleteMany()
    await context.prisma.exerciseInstance.deleteMany()
    
    // Create workouts
    const firstWorkout = await context.prisma.workout.create({
      data: {
        name: 'Tourmaline Surf Sesh',
        description: 'Great beginner spot - easy to catch waves',
        location: 'Tourmaline Surf Park'
      }
    })

    const secondWorkout = await context.prisma.workout.create({
      data: {
        name: 'Marsh Workout',
        description: 'Marsh by my house',
        length: 120,
        location: 'Famosa Slough'
      }
    })

    const thirdWorkout = await context.prisma.workout.create({
      data: {
        name: 'Gym Workout',
        description: 'pumping iron at the place down the street',
        length: 120,
        location: 'Point Loma Gym'
      }
    })

    // Create exercises
    const exercisesData = [
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
      },
      {
        name: 'Bicep Curl',
        reps: 10,
        sets: 3,
        weight: 15,
        unit: 'lbs',
        workoutId: Number(thirdWorkout.id)
      },
      {
        name: 'Chest Press',
        reps: 8,
        sets: 3,
        weight: 40,
        unit: 'lbs',
        workoutId: Number(thirdWorkout.id)
      },
      {
        name: 'Shoulder Press',
        reps: 8,
        sets: 3,
        weight: 30,
        unit: 'lbs',
        workoutId: Number(thirdWorkout.id)
      },
    ]

    let exercisesResult = []

    for (let i = 0; i < exercisesData.length; i++) {
      const response = await context.prisma.exercise.create({
        data: exercisesData[i]
      })
  
      exercisesResult.push(response)
    }


    // Create a session
    const createdSession = await context.prisma.session.create({
      data: {
        workoutId: Number(thirdWorkout.id),
        completed: false
      }
    })

    console.log('createdSession', createdSession)
    

    // Create exercise instances
    const exInstancesData = exercisesResult
      .filter((ex) => ex.workoutId === createdSession.workoutId)
      .map((ex) => {
        return {
          exerciseId: ex.id,
          sessionId: createdSession.id,
          setsCompleted: 0,
          repsCompleted: 0
        }
      })

    for (let i = 0; i < exInstancesData.length; i++) {
      await context.prisma.exerciseInstance.create({
        data: exInstancesData[i]
      })
    }

    return "Successfully seeded DB";
  } catch (err) {
    console.log('Error seeding DB ==>', err);
  }
}

module.exports = seed;