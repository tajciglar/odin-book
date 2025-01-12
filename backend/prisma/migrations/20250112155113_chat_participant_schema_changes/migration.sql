/*
  Warnings:

  - A unique constraint covering the columns `[userId,chatId]` on the table `ChatParticipant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "ChatParticipant_chatId_idx" ON "ChatParticipant"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatParticipant_userId_chatId_key" ON "ChatParticipant"("userId", "chatId");
