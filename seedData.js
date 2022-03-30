const bcrypt = require('bcryptjs')

const seedData = {
  firstUser: {
    username: 'testuser'
  },
  workouts: [
    {
      name: 'Leg Day',
      description: 'For building an impressive pair of gams.',
      length: 120,
      location: 'Galaxy Fitness Gym'
    },
    {
      name: 'Back Workout',
      description: 'Go slow on this one if it\'s been a while.',
      length: 120,
      location: 'Galaxy Fitness Gym'
    },
    {
      name: 'Shoulder Workout',
      description: 'Studies show that shoulder workouts relieve pain and decrease the possibility of future dislocations.',
      length: 120,
      location: 'Galaxy Fitness Gym'
    },
    {
      name: 'Chest Workout',
      description: 'Get there early while the benches are open.',
      length: 120,
      location: 'Galaxy Fitness Gym'
    },
  ],
  exercises: [
    {
      name: 'Barbell Back Squat',
      reps: 5,
      sets: 3,
      weight: 40,
      workoutIndex: 0
    },
    {
      name: 'Romanian Deadlift',
      reps: 6,
      sets: 3,
      weight: 40,
      workoutIndex: 0
    },
    {
      name: 'Walking Dumbbell Lunge',
      reps: 6,
      sets: 3,
      weight: 30,
      workoutIndex: 0
    },
    {
      name: 'Deadlift',
      reps: 5,
      sets: 3,
      weight: 40,
      workoutIndex: 1
    },
    {
      name: 'Bent Row',
      reps: 10,
      sets: 3,
      weight: 30,
      workoutIndex: 1
    },
    {
      name: 'Pull-up',
      reps: 5,
      sets: 3,
      workoutIndex: 1
    },
    {
      name: 'Seated Dumbbell Shoulder Press',
      reps: 10,
      sets: 3,
      weight: 30,
      unit: 'lbs',
      workoutIndex: 2
    },
    {
      name: 'Front Raise',
      reps: 8,
      sets: 3,
      weight: 14,
      unit: 'lbs',
      workoutIndex: 2
    },
    {
      name: 'Dumbbell Lateral Raise',
      reps: 8,
      sets: 3,
      weight: 14,
      unit: 'lbs',
      workoutIndex: 2
    }
  ],
  sessions: [
    {
      workoutIndex: 0,
      completed: true
    },
    {
      workoutIndex: 1,
      completed: true
    },
    {
      workoutIndex: 2,
      completed: false
    }
  ]
}

module.exports = seedData