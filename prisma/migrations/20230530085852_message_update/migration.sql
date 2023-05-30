/*
  Warnings:

  - You are about to drop the column `text` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `body` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MessageContentType" AS ENUM ('image', 'text');

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "text",
DROP COLUMN "userId",
ADD COLUMN     "attachments" TEXT[],
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "contentType" "MessageContentType" NOT NULL DEFAULT 'text',
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
