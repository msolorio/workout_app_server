const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    workouts: [Workout!]!
    workout(id: ID!): Workout
    info: String!
    exercise(id: ID!): Exercise
  }

  type Mutation {
    seed: String!

    createWorkout(
      name: String!
      description: String
      length: Int
      location: String!
      exercises: [InputExercise!]
    ): Workout!

    deleteWorkout(id: ID!): Workout

    addExerciseToWorkout(
      name: String!
      reps: Int!
      sets: Int!
      weight: Int
      unit: String
      workoutId: ID!
    ): Exercise!

    deleteExercise(id: ID!): Exercise
  }

  type Exercise {
    id: ID!
    name: String!
    reps: Int!
    sets: Int
    weight: Int
    unit: String
    workout: Workout
  }

  type Workout {
    id: ID!
    name: String!
    description: String
    # "length of the workout in minutes"
    length: Int
    location: String
    exercises: [Exercise!]!
  }

  input InputExercise {
    name: String!
    reps: Int!
    sets: Int
    weight: Int
    unit: String
  }
`;

module.exports = typeDefs;
