-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_userId_fkey";

-- DropForeignKey
ALTER TABLE "FileContributors" DROP CONSTRAINT "FileContributors_fileId_fkey";

-- DropForeignKey
ALTER TABLE "FileContributors" DROP CONSTRAINT "FileContributors_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "RequestToProject" DROP CONSTRAINT "RequestToProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "RequestToProject" DROP CONSTRAINT "RequestToProject_userId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnFile" DROP CONSTRAINT "TagsOnFile_fileId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnFile" DROP CONSTRAINT "TagsOnFile_tagName_fkey";

-- DropForeignKey
ALTER TABLE "UserOnConversation" DROP CONSTRAINT "UserOnConversation_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnConversation" DROP CONSTRAINT "UserOnConversation_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnProject" DROP CONSTRAINT "UserOnProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnProject" DROP CONSTRAINT "UserOnProject_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnUnseenConversation" DROP CONSTRAINT "UserOnUnseenConversation_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnUnseenConversation" DROP CONSTRAINT "UserOnUnseenConversation_userId_fkey";

-- AddForeignKey
ALTER TABLE "RequestToProject" ADD CONSTRAINT "RequestToProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestToProject" ADD CONSTRAINT "RequestToProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnProject" ADD CONSTRAINT "UserOnProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnProject" ADD CONSTRAINT "UserOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnConversation" ADD CONSTRAINT "UserOnConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnConversation" ADD CONSTRAINT "UserOnConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnUnseenConversation" ADD CONSTRAINT "UserOnUnseenConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnUnseenConversation" ADD CONSTRAINT "UserOnUnseenConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnFile" ADD CONSTRAINT "TagsOnFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "SharedFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnFile" ADD CONSTRAINT "TagsOnFile_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileContributors" ADD CONSTRAINT "FileContributors_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "SharedFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileContributors" ADD CONSTRAINT "FileContributors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
