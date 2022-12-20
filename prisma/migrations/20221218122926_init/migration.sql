-- CreateTable
CREATE TABLE `Property` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `space` DOUBLE NULL,
    `rooms` INTEGER NULL,
    `parking` BOOLEAN NULL,
    `warehouse` BOOLEAN NULL,
    `elevator` BOOLEAN NULL,
    `age` INTEGER NULL,
    `pricePerMeter` DOUBLE NULL,
    `floor` INTEGER NULL,
    `total_floors` INTEGER NULL,
    `description_raw` LONGTEXT NULL,

    UNIQUE INDEX `Property_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
