-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `program_name` VARCHAR(191) NOT NULL,
    `referrer_bonus_amount` DECIMAL(65, 30) NOT NULL,
    `referee_bonus_amount` DECIMAL(65, 30) NOT NULL,
    `referee_email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
