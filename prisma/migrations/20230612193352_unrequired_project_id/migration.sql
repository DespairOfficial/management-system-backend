-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_projectId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
