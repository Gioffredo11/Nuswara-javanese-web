-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guestToken` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_guestToken_key`(`guestToken`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `source` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'REVIEWED') NOT NULL DEFAULT 'DRAFT',
    `variantNote` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `character_categories_slug_key`(`slug`),
    INDEX `character_categories_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `characters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `javaneseName` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `categoryId` INTEGER NOT NULL,
    `shortDescription` TEXT NOT NULL,
    `personality` JSON NULL,
    `uniqueFacts` TEXT NULL,
    `storySummary` TEXT NULL,
    `lineArtKey` VARCHAR(191) NULL,
    `traitTags` JSON NULL,
    `neptuAffinity` INTEGER NULL,
    `kingdom` VARCHAR(191) NULL,
    `generationLevel` INTEGER NOT NULL DEFAULT 1,
    `order` INTEGER NOT NULL DEFAULT 0,
    `source` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'REVIEWED') NOT NULL DEFAULT 'DRAFT',
    `variantNote` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `characters_slug_key`(`slug`),
    INDEX `characters_categoryId_idx`(`categoryId`),
    INDEX `characters_status_idx`(`status`),
    FULLTEXT INDEX `characters_name_shortDescription_idx`(`name`, `shortDescription`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_relationships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fromId` INTEGER NOT NULL,
    `toId` INTEGER NOT NULL,
    `type` ENUM('PARENT', 'SPOUSE', 'SIBLING', 'TEACHER', 'ALLY', 'RIVAL') NOT NULL,
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `character_relationships_fromId_idx`(`fromId`),
    INDEX `character_relationships_toId_idx`(`toId`),
    UNIQUE INDEX `character_relationships_fromId_toId_type_key`(`fromId`, `toId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weapons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `origin` VARCHAR(191) NULL,
    `power` TEXT NULL,
    `source` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'REVIEWED') NOT NULL DEFAULT 'DRAFT',
    `variantNote` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `weapons_slug_key`(`slug`),
    INDEX `weapons_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_weapons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `weaponId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `character_weapons_characterId_idx`(`characterId`),
    INDEX `character_weapons_weaponId_idx`(`weaponId`),
    UNIQUE INDEX `character_weapons_characterId_weaponId_key`(`characterId`, `weaponId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `philosophies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `textJawa` VARCHAR(191) NOT NULL,
    `meaning` TEXT NOT NULL,
    `modernInterpretation` TEXT NOT NULL,
    `primaryCharacterId` INTEGER NULL,
    `source` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'REVIEWED') NOT NULL DEFAULT 'DRAFT',
    `variantNote` TEXT NULL,
    `category` VARCHAR(191) NOT NULL DEFAULT 'KEARIFAN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `philosophies_slug_key`(`slug`),
    INDEX `philosophies_primaryCharacterId_idx`(`primaryCharacterId`),
    INDEX `philosophies_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_philosophies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `philosophyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `character_philosophies_characterId_idx`(`characterId`),
    INDEX `character_philosophies_philosophyId_idx`(`philosophyId`),
    UNIQUE INDEX `character_philosophies_characterId_philosophyId_key`(`characterId`, `philosophyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL,
    `coverKey` VARCHAR(191) NULL,
    `philosophyId` INTEGER NULL,
    `theme` VARCHAR(191) NOT NULL DEFAULT 'Kepahlawanan',
    `source` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'REVIEWED') NOT NULL DEFAULT 'DRAFT',
    `variantNote` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `stories_slug_key`(`slug`),
    INDEX `stories_philosophyId_idx`(`philosophyId`),
    INDEX `stories_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `story_characters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storyId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'PROTAGONIST',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `story_characters_storyId_idx`(`storyId`),
    INDEX `story_characters_characterId_idx`(`characterId`),
    UNIQUE INDEX `story_characters_storyId_characterId_key`(`storyId`, `characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `story_chapters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storyId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `summary` TEXT NULL,
    `estimatedReadSeconds` INTEGER NOT NULL DEFAULT 120,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `story_chapters_storyId_idx`(`storyId`),
    UNIQUE INDEX `story_chapters_storyId_order_key`(`storyId`, `order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `story_scenes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapterId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `narration` TEXT NOT NULL,
    `speakerName` VARCHAR(191) NULL,
    `illustrationKey` VARCHAR(191) NULL,
    `culturalNote` TEXT NULL,
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `story_scenes_chapterId_idx`(`chapterId`),
    UNIQUE INDEX `story_scenes_chapterId_order_key`(`chapterId`, `order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `batik_patterns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `originRegion` VARCHAR(191) NOT NULL DEFAULT 'Jawa Tengah',
    `shortHistory` TEXT NOT NULL,
    `philosophy` TEXT NOT NULL,
    `usage` TEXT NOT NULL,
    `vectorKey` VARCHAR(191) NULL,
    `colorPalette` JSON NULL,
    `source` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'REVIEWED') NOT NULL DEFAULT 'DRAFT',
    `variantNote` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `batik_patterns_slug_key`(`slug`),
    INDEX `batik_patterns_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `batik_related_characters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `batikPatternId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `batik_related_characters_batikPatternId_idx`(`batikPatternId`),
    INDEX `batik_related_characters_characterId_idx`(`characterId`),
    UNIQUE INDEX `batik_related_characters_batikPatternId_characterId_key`(`batikPatternId`, `characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visual_elements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `kind` ENUM('EYE', 'NOSE', 'FACE_SHAPE', 'FACE_COLOR', 'OTHER') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `meaning` TEXT NOT NULL,
    `characterId` INTEGER NULL,
    `source` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'REVIEWED') NOT NULL DEFAULT 'DRAFT',
    `variantNote` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `visual_elements_slug_key`(`slug`),
    INDEX `visual_elements_kind_idx`(`kind`),
    INDEX `visual_elements_characterId_idx`(`characterId`),
    INDEX `visual_elements_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weton` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dayName` VARCHAR(191) NOT NULL,
    `pasaran` VARCHAR(191) NOT NULL,
    `neptu` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `auraTitle` VARCHAR(191) NULL,
    `summary` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `weton_dayName_pasaran_key`(`dayName`, `pasaran`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weton_traits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wetonId` INTEGER NOT NULL,
    `trait` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `weton_traits_wetonId_idx`(`wetonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weton_character_rules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wetonId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `matchReason` TEXT NOT NULL,
    `compatibilityAdvice` TEXT NOT NULL,
    `priority` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `weton_character_rules_wetonId_idx`(`wetonId`),
    INDEX `weton_character_rules_characterId_idx`(`characterId`),
    UNIQUE INDEX `weton_character_rules_wetonId_characterId_key`(`wetonId`, `characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oracle_results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `wetonId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `resultJson` JSON NOT NULL,
    `shareLinkId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `oracle_results_userId_idx`(`userId`),
    INDEX `oracle_results_wetonId_idx`(`wetonId`),
    INDEX `oracle_results_characterId_idx`(`characterId`),
    INDEX `oracle_results_shareLinkId_idx`(`shareLinkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_manifestations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `localDate` VARCHAR(191) NOT NULL,
    `philosophyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `daily_manifestations_userId_idx`(`userId`),
    INDEX `daily_manifestations_philosophyId_idx`(`philosophyId`),
    UNIQUE INDEX `daily_manifestations_userId_localDate_key`(`userId`, `localDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manifestation_characters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dailyManifestationId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `manifestation_characters_dailyManifestationId_idx`(`dailyManifestationId`),
    INDEX `manifestation_characters_characterId_idx`(`characterId`),
    UNIQUE INDEX `manifestation_characters_dailyManifestationId_characterId_key`(`dailyManifestationId`, `characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photobooth_frames` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `assetKey` VARCHAR(191) NOT NULL,
    `config` JSON NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `photobooth_frames_slug_key`(`slug`),
    INDEX `photobooth_frames_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photobooth_filters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `assetKey` VARCHAR(191) NOT NULL,
    `config` JSON NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `photobooth_filters_slug_key`(`slug`),
    INDEX `photobooth_filters_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `share_links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortCode` VARCHAR(191) NOT NULL,
    `type` ENUM('ORACLE', 'MANIFESTATION', 'PHOTO') NOT NULL,
    `referenceId` VARCHAR(191) NULL,
    `snapshotData` JSON NULL,
    `expiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `share_links_shortCode_key`(`shortCode`),
    INDEX `share_links_type_idx`(`type`),
    INDEX `share_links_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photo_assets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shareLinkId` INTEGER NOT NULL,
    `storageKey` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `sizeBytes` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `photo_assets_shareLinkId_idx`(`shareLinkId`),
    INDEX `photo_assets_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `characters` ADD CONSTRAINT `characters_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `character_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_relationships` ADD CONSTRAINT `character_relationships_fromId_fkey` FOREIGN KEY (`fromId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_relationships` ADD CONSTRAINT `character_relationships_toId_fkey` FOREIGN KEY (`toId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_weapons` ADD CONSTRAINT `character_weapons_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_weapons` ADD CONSTRAINT `character_weapons_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `weapons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `philosophies` ADD CONSTRAINT `philosophies_primaryCharacterId_fkey` FOREIGN KEY (`primaryCharacterId`) REFERENCES `characters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_philosophies` ADD CONSTRAINT `character_philosophies_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_philosophies` ADD CONSTRAINT `character_philosophies_philosophyId_fkey` FOREIGN KEY (`philosophyId`) REFERENCES `philosophies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stories` ADD CONSTRAINT `stories_philosophyId_fkey` FOREIGN KEY (`philosophyId`) REFERENCES `philosophies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `story_characters` ADD CONSTRAINT `story_characters_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `stories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `story_characters` ADD CONSTRAINT `story_characters_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `story_chapters` ADD CONSTRAINT `story_chapters_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `stories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `story_scenes` ADD CONSTRAINT `story_scenes_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `story_chapters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `batik_related_characters` ADD CONSTRAINT `batik_related_characters_batikPatternId_fkey` FOREIGN KEY (`batikPatternId`) REFERENCES `batik_patterns`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `batik_related_characters` ADD CONSTRAINT `batik_related_characters_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visual_elements` ADD CONSTRAINT `visual_elements_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `weton_traits` ADD CONSTRAINT `weton_traits_wetonId_fkey` FOREIGN KEY (`wetonId`) REFERENCES `weton`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `weton_character_rules` ADD CONSTRAINT `weton_character_rules_wetonId_fkey` FOREIGN KEY (`wetonId`) REFERENCES `weton`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `weton_character_rules` ADD CONSTRAINT `weton_character_rules_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oracle_results` ADD CONSTRAINT `oracle_results_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oracle_results` ADD CONSTRAINT `oracle_results_wetonId_fkey` FOREIGN KEY (`wetonId`) REFERENCES `weton`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oracle_results` ADD CONSTRAINT `oracle_results_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oracle_results` ADD CONSTRAINT `oracle_results_shareLinkId_fkey` FOREIGN KEY (`shareLinkId`) REFERENCES `share_links`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_manifestations` ADD CONSTRAINT `daily_manifestations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_manifestations` ADD CONSTRAINT `daily_manifestations_philosophyId_fkey` FOREIGN KEY (`philosophyId`) REFERENCES `philosophies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `manifestation_characters` ADD CONSTRAINT `manifestation_characters_dailyManifestationId_fkey` FOREIGN KEY (`dailyManifestationId`) REFERENCES `daily_manifestations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `manifestation_characters` ADD CONSTRAINT `manifestation_characters_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photo_assets` ADD CONSTRAINT `photo_assets_shareLinkId_fkey` FOREIGN KEY (`shareLinkId`) REFERENCES `share_links`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

