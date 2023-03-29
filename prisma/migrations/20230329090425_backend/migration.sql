/*
  Warnings:

  - The primary key for the `api_keys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ID` on the `api_keys` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `api_keys` DROP PRIMARY KEY,
    MODIFY `ID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ID`);

-- CreateTable
CREATE TABLE `permissions` (
    `ID` VARCHAR(191) NOT NULL,
    `APIID` INTEGER NOT NULL,
    `permission` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_APIID_fkey` FOREIGN KEY (`APIID`) REFERENCES `api_keys`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
