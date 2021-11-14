/*
  Warnings:

  - Added the required column `setsCompleted` to the `ExerciseInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseInstance" ADD COLUMN     "setsCompleted" INTEGER NOT NULL;
