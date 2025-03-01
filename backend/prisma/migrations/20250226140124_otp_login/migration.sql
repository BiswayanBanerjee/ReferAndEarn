/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `Otp_email_fkey`;

-- DropIndex
DROP INDEX `Otp_email_fkey` ON `otp`;

-- DropTable
DROP TABLE `user`;
