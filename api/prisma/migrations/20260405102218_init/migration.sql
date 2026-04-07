-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "SmellType" AS ENUM ('MYSTERIOUS_NAME', 'DUPLICATED_CODE', 'LONG_METHOD', 'LONG_PARAMETER_LIST', 'GLOBAL_DATA', 'MUTABLE_DATA', 'DIVERGENT_CHANGE', 'SHOTGUN_SURGERY', 'FEATURE_ENVY', 'DATA_CLUMPS', 'PRIMITIVE_OBSESSION', 'REPEATED_SWITCHES', 'LAZY_ELEMENT', 'SPECULATIVE_GENERALITY', 'TEMPORARY_FIELD', 'MESSAGE_CHAINS', 'MIDDLE_MAN', 'LARGE_CLASS', 'COMMENTS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL DEFAULT 'Anônimo',
    "email" TEXT,
    "password" TEXT,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mergedToId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmellLine" (
    "id" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "smellType" "SmellType" NOT NULL,
    "line" INTEGER NOT NULL,

    CONSTRAINT "SmellLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "correctLines" INTEGER NOT NULL,
    "correctSmells" INTEGER NOT NULL,
    "attemptData" JSONB,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_isAnonymous_idx" ON "User"("isAnonymous");

-- CreateIndex
CREATE INDEX "Exercise_difficulty_idx" ON "Exercise"("difficulty");

-- CreateIndex
CREATE INDEX "SmellLine_exerciseId_idx" ON "SmellLine"("exerciseId");

-- CreateIndex
CREATE INDEX "SmellLine_smellType_idx" ON "SmellLine"("smellType");

-- CreateIndex
CREATE UNIQUE INDEX "SmellLine_exerciseId_line_key" ON "SmellLine"("exerciseId", "line");

-- CreateIndex
CREATE INDEX "Attempt_userId_idx" ON "Attempt"("userId");

-- CreateIndex
CREATE INDEX "Attempt_exerciseId_idx" ON "Attempt"("exerciseId");

-- AddForeignKey
ALTER TABLE "SmellLine" ADD CONSTRAINT "SmellLine_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
