/*
  Warnings:

  - Added the required column `parentAuthExpireAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentAuthToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "parentAuthExpireAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "parentAuthToken" TEXT NOT NULL;
