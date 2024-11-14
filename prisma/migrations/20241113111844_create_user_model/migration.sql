-- CreateEnum
CREATE TYPE "user_profiles_gender_enum" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "user_profiles_profile_type_enum" AS ENUM ('student', 'professional', 'careerShifter');

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "age" INTEGER,
    "gender" "user_profiles_gender_enum",
    "profileType" "user_profiles_profile_type_enum",
    "user_id" UUID NOT NULL,
    "phoneNumber" TEXT,
    "deleted" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
