-- CreateEnum
CREATE TYPE "OnlineStatus" AS ENUM ('online', 'offline', 'away', 'busy');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ADD COLUMN     "lastActivity" TIMESTAMP(3),
ADD COLUMN     "status" "OnlineStatus" NOT NULL DEFAULT 'offline';
