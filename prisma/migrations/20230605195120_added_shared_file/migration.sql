-- CreateTable
CREATE TABLE "SharedFile" (
    "id" UUID NOT NULL DEFAULT uuid7(),
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnFile" (
    "fileId" UUID NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnFile_pkey" PRIMARY KEY ("fileId","tagId")
);

-- CreateTable
CREATE TABLE "FileContributors" (
    "fileId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "FileContributors_pkey" PRIMARY KEY ("fileId","userId")
);

-- AddForeignKey
ALTER TABLE "TagsOnFile" ADD CONSTRAINT "TagsOnFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "SharedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnFile" ADD CONSTRAINT "TagsOnFile_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileContributors" ADD CONSTRAINT "FileContributors_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "SharedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileContributors" ADD CONSTRAINT "FileContributors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
