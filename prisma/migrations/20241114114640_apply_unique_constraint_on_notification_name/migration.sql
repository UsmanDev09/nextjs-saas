/*
  Warnings:

  - A unique constraint covering the columns `[notificationName]` on the table `NotificationType` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "notificationLink" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "NotificationType" ALTER COLUMN "notificationName" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users_verification_tokens" ALTER COLUMN "type" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "NotificationType_notificationName_key" ON "NotificationType"("notificationName");
