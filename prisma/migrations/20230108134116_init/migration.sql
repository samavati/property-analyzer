-- CreateTable
CREATE TABLE `Car` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `price` DOUBLE NULL,
    `date` TIMESTAMP(3) NULL,
    `neighborhood` VARCHAR(191) NULL,
    `paymentType` VARCHAR(191) NULL,
    `brand` VARCHAR(191) NULL,
    `chassis` VARCHAR(191) NULL,
    `productionYear` INTEGER NULL,
    `mileage` DOUBLE NULL,
    `type` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `gearboxType` VARCHAR(191) NULL,
    `bodyStatus` VARCHAR(191) NULL,
    `fuelType` VARCHAR(191) NULL,
    `description_raw` LONGTEXT NULL,

    UNIQUE INDEX `Car_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Building` (
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

    UNIQUE INDEX `Building_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
