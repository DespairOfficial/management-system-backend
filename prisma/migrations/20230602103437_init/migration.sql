-- CreateEnum
CREATE TYPE "ConversationType" AS ENUM ('ONE_TO_ONE', 'GROUP');

-- CreateEnum
CREATE TYPE "OnlineStatus" AS ENUM ('online', 'offline', 'away', 'busy');

-- CreateEnum
CREATE TYPE "MessageContentType" AS ENUM ('image', 'text');

--CreateUuidFunc

create or replace function uuid7() returns uuid as $$
declare
v_time timestamp with time zone:= null;
v_secs bigint := null;
v_msec bigint := null;
v_usec bigint := null;

v_timestamp bigint := null;
v_timestamp_hex varchar := null;

v_random bigint := null;
v_random_hex varchar := null;

v_bytes bytea;

c_variant bit(64):= x'8000000000000000'; -- RFC-4122 variant: b'10xx...'
begin

-- Get seconds and micros
v_time := clock_timestamp();
v_secs := EXTRACT(EPOCH FROM v_time);
v_msec := mod(EXTRACT(MILLISECONDS FROM v_time)::numeric, 10^3::numeric);
v_usec := mod(EXTRACT(MICROSECONDS FROM v_time)::numeric, 10^3::numeric);

-- Generate timestamp hexadecimal (and set version 7)
v_timestamp := (((v_secs * 10^3) + v_msec)::bigint << 12) | (v_usec << 2);
v_timestamp_hex := lpad(to_hex(v_timestamp), 16, '0');
v_timestamp_hex := substr(v_timestamp_hex, 2, 12) || '7' || substr(v_timestamp_hex, 14, 3);

-- Generate the random hexadecimal (and set variant b'10xx')
v_random := ((random()::numeric * 2^62::numeric)::bigint::bit(64) | c_variant)::bigint;
v_random_hex := lpad(to_hex(v_random), 16, '0');

-- Concat timestemp and random hexadecimal
v_bytes := decode(v_timestamp_hex || v_random_hex, 'hex');

return encode(v_bytes, 'hex')::uuid;

end $$ language plpgsql;

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid7(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "country" TEXT,
    "phoneNumber" TEXT,
    "company" TEXT,
    "role" TEXT,
    "about" TEXT,
    "address" TEXT,
    "lastActivity" TIMESTAMP(3),
    "status" "OnlineStatus" NOT NULL DEFAULT 'offline',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "userId" UUID NOT NULL,
    "emailVerificationCode" TEXT,
    "forgotPasswordCode" TEXT
);

-- CreateTable
CREATE TABLE "Password" (
    "userId" UUID NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestToProject" (
    "userId" UUID NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestToProject_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "UserOnProject" (
    "userId" UUID NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserOnProject_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "senderId" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "contentType" "MessageContentType" NOT NULL DEFAULT 'text',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "type" "ConversationType" NOT NULL DEFAULT 'GROUP',

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnConversation" (
    "conversationId" INTEGER NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserOnConversation_pkey" PRIMARY KEY ("conversationId","userId")
);

-- CreateTable
CREATE TABLE "UserOnUnseenConversation" (
    "conversationId" INTEGER NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserOnUnseenConversation_pkey" PRIMARY KEY ("conversationId","userId")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "userId" UUID NOT NULL,
    "contactId" UUID NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("userId","contactId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_userId_key" ON "Verification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_refreshToken_key" ON "Session"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_fingerprint_key" ON "Session"("fingerprint");

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestToProject" ADD CONSTRAINT "RequestToProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestToProject" ADD CONSTRAINT "RequestToProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnProject" ADD CONSTRAINT "UserOnProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnProject" ADD CONSTRAINT "UserOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnConversation" ADD CONSTRAINT "UserOnConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnConversation" ADD CONSTRAINT "UserOnConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnUnseenConversation" ADD CONSTRAINT "UserOnUnseenConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnUnseenConversation" ADD CONSTRAINT "UserOnUnseenConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
