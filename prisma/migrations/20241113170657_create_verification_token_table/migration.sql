-- CreateTable
CREATE TABLE "users_verification_tokens" (
    "id" UUID NOT NULL,
    "type" VARCHAR NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT,
    "expire_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "users_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_verification_tokens_userId_type_key" ON "users_verification_tokens"("userId", "type");

-- AddForeignKey
ALTER TABLE "users_verification_tokens" ADD CONSTRAINT "users_verification_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
