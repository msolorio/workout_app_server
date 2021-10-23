const workouts = [
  {
    id: '1',
    date: '2021/10/20',
    description: 'this is a description',
    length: 60,
    location: 'home'
  },
  {
    id: '2',
    date: '2021/10/21',
    description: 'this is a description',
    length: 60,
    location: 'gym'
  },
  {
    id: '3',
    date: '2021/10/22',
    description: 'this is a description',
    length: 60,
    location: 'park'
  },
];

// const sets = [
//   {
//     id: '1',
//     exercise: 'bicep curl',
//     reps: 10,
//     workoutId: '1'
//   },
//   {
//     id: '2',
//     exercise: 'bicep curl',
//     reps: 9,
//     workoutId: '2'
//   },
//   {
//     id: '3',
//     exercise: 'pull ups',
//     reps: 5,
//     workoutId: '2'
//   },
//   {
//     id: '4',
//     exercise: 'pull ups',
//     reps: 5,
//     workoutId: '3'
//   },
// ]

const mocks = {
  Query: {
    info: () => 'This is the info',
    workouts: () => workouts
  },

  // Workout: {
  //   sets: () => {

  //   }
  // }
}

module.exports = mocks;