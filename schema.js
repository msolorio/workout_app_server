const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    workouts(token: String!): [Workout!]!
    workout(token: String!, id: ID!): Workout
    session(token: String!, id: ID!): Session
    sessions(token: String!): [Session!]!
    info: String!
  }

  type Mutation {
    seed: SeededData

    signup(username: String!, password: String!): AuthPayload

    login(username: String!, password: String!): AuthPayload

    createWorkout(
      token: String!
      name: String!
      description: String
      length: Int
      location: String!
      exercises: [InputExercise!]
    ): Workout!

    updateWorkout(
      token: String!
      id: ID!
      name: String
      description: String
      length: Int
      location: String
      exercises: [InputUpdateExercise!]
    ): Workout!

    deleteWorkout(
      token: String!
      id: ID!
    ): CountResponse

    createExercise(
      token: String!
      name: String!
      reps: Int
      sets: Int!
      weight: Int
      unit: String
      workoutId: ID!
    ): Exercise!

    deleteExercise(
      token: String!
      id: ID!
    ): CountResponse

    createSession(
      token: String!
      workoutId: ID!
    ): Session!

    completeSession(
      token: String!
      id: ID!
    ): CountResponse

    updateSetForExInstance(
      token: String!
      id: ID!
      setsCompleted: Int!
    ): ExerciseInstance!
  }

  type SeededData {
    workouts: [Workout!]!
    sessions: [Session!]!
    users: [User!]!
  }

  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    token: String
    user: User
    error: String
  }

  type CountResponse {
    count: Int!
  }

  type Exercise {
    id: ID!
    name: String!
    reps: Int!
    sets: Int
    weight: Int
    unit: String
    workout: Workout
    exerciseInstances: [ExerciseInstance!]!
  }

  type Workout {
    id: ID!
    name: String!
    description: String
    # "length of the workout in minutes"
    length: Int
    location: String
    exercises: [Exercise!]!
    sessions: [Session!]!
    user: User!
  }

  type Session {
    id: ID!
    workout: Workout!
    user: User!
    completed: Boolean!
    date: Float!
    exerciseInstances: [ExerciseInstance!]!
  }

  type ExerciseInstance {
    id: ID!
    exercise: Exercise!
    session: Session!
    setsCompleted: Int!
    repsCompleted: Int!
  }

  input InputUpdateExercise {
    id: ID
    name: String
    reps: Int
    sets: Int
    weight: Int
    unit: String
  }

  input InputExercise {
    id: ID
    name: String!
    reps: Int!
    sets: Int
    weight: Int
    unit: String
  }
`;

module.exports = typeDefs;
