/*
  Warnings:

  - You are about to drop the column `exercise` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `name` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exercise",
ADD COLUMN     "name" TEXT NOT NULL;
