-- AlterTable
ALTER TABLE "User" ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "oauth_provider" TEXT;
