-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_workoutId_fkey";

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
