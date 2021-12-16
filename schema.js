const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    workouts: [Workout!]!
    workout(id: ID!): Workout
    info: String!
    exercise(id: ID!): Exercise
    session(id: ID!): Session
    sessions: [Session!]!
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

    updateWorkout(
      id: ID!
      name: String
      description: String
      length: Int
      location: String
      exercises: [InputUpdateExercise!]
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

    createSession(
      workoutId: ID!
    ): Session!

    closeSession(id: ID!): Session 

    updateSetForExInstance(
      id: ID!
      setsCompleted: Int!
    ): ExerciseInstance!

    updateRepsForExInstance(
      id: ID!
      repsCompleted: Int!
    ): ExerciseInstance!
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
  }

  type Session {
    id: ID!
    workout: Workout!
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
