-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "fromUserId" UUID,
    "notificationMessage" TEXT,
    "notificationLink" VARCHAR(255),
    "userAction" TEXT NOT NULL DEFAULT 'unread',
    "expiryDate" TIMESTAMP(3),
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userRequestAction" TEXT NOT NULL DEFAULT 'no-action',
    "systemNotificationReadedBy" TEXT,
    "systemNotificationDeletedBy" TEXT,
    "notificationTypeId" UUID,
    "groupId" UUID,
    "profileId" UUID,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationType" (
    "id" UUID NOT NULL,
    "notificationName" VARCHAR(255) NOT NULL,
    "isSystemGenerated" BOOLEAN DEFAULT false,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notificationTypeId_fkey" FOREIGN KEY ("notificationTypeId") REFERENCES "NotificationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
