/*
  Warnings:

  - You are about to drop the column `name` on the `KanbanComment` table. All the data in the column will be lost.
  - Added the required column `userId` to the `KanbanComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KanbanComment" DROP COLUMN "name",
ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "KanbanComment" ADD CONSTRAINT "KanbanComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
