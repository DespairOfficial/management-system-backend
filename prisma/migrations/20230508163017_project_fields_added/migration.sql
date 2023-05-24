/*
  Warnings:

  - You are about to drop the column `numberOfParticipants` on the `Project` table. All the data in the column will be lost.
  - Added the required column `budget` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "numberOfParticipants",
ADD COLUMN     "budget" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
