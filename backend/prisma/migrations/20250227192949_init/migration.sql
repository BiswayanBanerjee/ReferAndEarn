/*
  Warnings:

  - You are about to drop the column `program_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referee_bonus_amount` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referrer_bonus_amount` on the `user` table. All the data in the column will be lost.
  - Added the required column `programId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `program_name`,
    DROP COLUMN `referee_bonus_amount`,
    DROP COLUMN `referrer_bonus_amount`,
    ADD COLUMN `programId` INTEGER NOT NULL,
    MODIFY `referee_email` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Program` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `referrer_bonus_amount` DECIMAL(65, 30) NOT NULL,
    `referee_bonus_amount` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Program_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
