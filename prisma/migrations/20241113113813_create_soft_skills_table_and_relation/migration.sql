/*
  Warnings:

  - You are about to drop the column `user_id` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropIndex
DROP INDEX "Profile_user_id_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "user_id",
ADD COLUMN     "userId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "UsersToSkills" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "softSkillId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UsersToSkills_pkey" PRIMARY KEY ("userId","softSkillId")
);

-- CreateTable
CREATE TABLE "SoftSkill" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SoftSkill_name_key" ON "SoftSkill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UsersToSkills" ADD CONSTRAINT "UsersToSkills_softSkillId_fkey" FOREIGN KEY ("softSkillId") REFERENCES "SoftSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToSkills" ADD CONSTRAINT "UsersToSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
