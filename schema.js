const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    workouts: [Workout!]!
    workout(id: ID!): Workout
    info: String!
  }

  type Mutation {
    createWorkout(
      date: String!
      description: String
      length: Int
      location: String!
    ): Workout!

    addSetToWorkout(
      exercise: String!
      reps: Int!
      workoutId: ID!
    ): Set!

    deleteWorkout(id: ID!): Workout
  }

  type Set {
    id: ID!
    exercise: String!
    reps: Int!
    workout: Workout
  }

  type Workout {
    id: ID!
    date: String!
    description: String
    # "length of the workout in minutes"
    length: Int
    location: String!
    sets: [Set!]!
  }

`;

module.exports = typeDefs;
