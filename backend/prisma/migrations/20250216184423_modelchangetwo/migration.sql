-- AlterTable
ALTER TABLE "User" ALTER COLUMN "parentAuthExpireAt" DROP NOT NULL,
ALTER COLUMN "parentAuthToken" DROP NOT NULL;
