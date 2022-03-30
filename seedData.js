const bcrypt = require('bcryptjs')

const seedData = {
  firstUser: {
    username: 'testuser'
  },
  workouts: [
    {
      name: 'Tourmaline Surf Sesh',
      description: 'Great beginner spot - easy to catch waves',
      location: 'Tourmaline Surf Park'
    },
    {
      name: 'Marsh Workout',
      description: 'Marsh by my house',
      length: 120,
      location: 'Famosa Slough'
    },
    {
      name: 'Gym Workout',
      description: 'pumping iron at the place down the street',
      length: 120,
      location: 'Point Loma Gym'
    }
  ],
  exercises: [
    {
      name: 'Leg stretches',
      reps: 10,
      workoutIndex: 0
    },
    {
      name: 'Stand ups',
      reps: 10,
      workoutIndex: 0
    },
    {
      name: 'Paddle Sprints',
      reps: 2,
      workoutIndex: 0
    },
    {
      name: 'Push ups',
      reps: 20,
      sets: 3,
      workoutIndex: 1
    },
    {
      name: 'Upsidedown Shoulder Press',
      reps: 15,
      sets: 3,
      workoutIndex: 1
    },
    {
      name: 'Squats',
      reps: 10,
      sets: 3,
      workoutIndex: 1
    },
    {
      name: 'Bicep Curl',
      reps: 10,
      sets: 3,
      weight: 15,
      unit: 'lbs',
      workoutIndex: 2
    },
    {
      name: 'Chest Press',
      reps: 8,
      sets: 3,
      weight: 40,
      unit: 'lbs',
      workoutIndex: 2
    },
    {
      name: 'Shoulder Press',
      reps: 8,
      sets: 3,
      weight: 30,
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