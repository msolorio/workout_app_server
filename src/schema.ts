const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    workouts: [Workout!]!
    workout(id: ID!): Workout
    session(id: ID!): Session
    sessions: [Session!]!
    info: String!
  }

  type Mutation {
    seed: SeededData

    signup(username: String!, password: String!): AuthPayload

    login(username: String!, password: String!): AuthPayload

    logout: GeneralResponse

    createWorkout(
      name: String!
      description: String
      length: Int
      location: String
      exercises: [InputExercise!]
    ): Workout!

    updateWorkout(
      id: ID!
      name: String
      description: String
      length: Int
      location: String
      exercises: [InputUpdateExercise!]
    ): Workout!

    deleteWorkout(
      id: ID!
    ): CountResponse

    createExercise(
      name: String!
      reps: Int
      sets: Int!
      weight: Int
      unit: String
      workoutId: ID!
    ): Exercise!

    deleteExercise(
      id: ID!
    ): CountResponse

    createSession(
      workoutId: ID!
    ): Session!

    completeSession(
      id: ID!
    ): CountResponse

    updateSetForExInstance(
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
    user: User
    error: String
  }

  type GeneralResponse {
    error: String
    success: Boolean
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
