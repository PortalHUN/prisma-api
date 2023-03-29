-- CreateTable
CREATE TABLE `api_keys` (
    `ID` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `API_key` VARCHAR(191) NOT NULL,
    `Blocked` BOOLEAN NOT NULL DEFAULT true,
    `Admin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `api_keys_Name_key`(`Name`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
