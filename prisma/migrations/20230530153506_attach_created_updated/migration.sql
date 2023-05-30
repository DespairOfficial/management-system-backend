/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `dateModified` on the `Attachment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "dateCreated",
DROP COLUMN "dateModified",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
