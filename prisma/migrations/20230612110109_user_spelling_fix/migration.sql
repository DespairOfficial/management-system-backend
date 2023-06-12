/*
  Warnings:

  - You are about to drop the column `coune` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `imantry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoge` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "coune",
DROP COLUMN "imantry",
DROP COLUMN "phoge",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "phone" TEXT;
