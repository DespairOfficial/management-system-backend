-- CreateTable
CREATE TABLE "KanbanBoard" (
    "id" UUID NOT NULL DEFAULT uuid7(),
    "projectId" INTEGER NOT NULL,
    "columnOrder" TEXT[],

    CONSTRAINT "KanbanBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanbanCard" (
    "id" UUID NOT NULL DEFAULT uuid7(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "assigneeId" UUID NOT NULL,
    "due" TIMESTAMP(3)[],
    "attachments" TEXT[],
    "completed" BOOLEAN NOT NULL,
    "boardId" UUID NOT NULL,

    CONSTRAINT "KanbanCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanbanComment" (
    "id" UUID NOT NULL DEFAULT uuid7(),
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "messageType" "MessageContentType" NOT NULL,
    "message" TEXT NOT NULL,
    "cardId" UUID NOT NULL,

    CONSTRAINT "KanbanComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanbanColumn" (
    "id" UUID NOT NULL DEFAULT uuid7(),
    "name" TEXT NOT NULL,
    "boardId" UUID NOT NULL,

    CONSTRAINT "KanbanColumn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanbanCardOnColumn" (
    "cardId" UUID NOT NULL,
    "columnId" UUID NOT NULL,

    CONSTRAINT "KanbanCardOnColumn_pkey" PRIMARY KEY ("cardId","columnId")
);

-- AddForeignKey
ALTER TABLE "KanbanBoard" ADD CONSTRAINT "KanbanBoard_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanbanCard" ADD CONSTRAINT "KanbanCard_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanbanCard" ADD CONSTRAINT "KanbanCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KanbanBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanbanComment" ADD CONSTRAINT "KanbanComment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "KanbanCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanbanColumn" ADD CONSTRAINT "KanbanColumn_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KanbanBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanbanCardOnColumn" ADD CONSTRAINT "KanbanCardOnColumn_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "KanbanCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanbanCardOnColumn" ADD CONSTRAINT "KanbanCardOnColumn_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "KanbanColumn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
