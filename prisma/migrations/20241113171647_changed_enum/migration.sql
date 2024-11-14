/*
  Warnings:

  - The values [careerShifter] on the enum `user_profiles_profile_type_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "user_profiles_profile_type_enum_new" AS ENUM ('student', 'professional');
ALTER TABLE "Profile" ALTER COLUMN "profileType" TYPE "user_profiles_profile_type_enum_new" USING ("profileType"::text::"user_profiles_profile_type_enum_new");
ALTER TYPE "user_profiles_profile_type_enum" RENAME TO "user_profiles_profile_type_enum_old";
ALTER TYPE "user_profiles_profile_type_enum_new" RENAME TO "user_profiles_profile_type_enum";
DROP TYPE "user_profiles_profile_type_enum_old";
COMMIT;
