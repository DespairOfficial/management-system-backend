-- CreateEnum
CREATE TYPE "SharedFilePermission" AS ENUM ('view', 'edit');

-- AlterTable
ALTER TABLE "FileContributors" ADD COLUMN     "permission" "SharedFilePermission" NOT NULL DEFAULT 'view';
