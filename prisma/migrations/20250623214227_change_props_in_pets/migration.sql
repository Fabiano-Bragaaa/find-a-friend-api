/*
  Warnings:

  - You are about to drop the column `energyLevel` on the `Pets` table. All the data in the column will be lost.
  - You are about to drop the column `independenceLevel` on the `Pets` table. All the data in the column will be lost.
  - You are about to drop the column `petImages` on the `Pets` table. All the data in the column will be lost.
  - Added the required column `energy_Level` to the `Pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independence_level` to the `Pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `Pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `Pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `Pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "energyLevel",
DROP COLUMN "independenceLevel",
DROP COLUMN "petImages",
ADD COLUMN     "energy_Level" TEXT NOT NULL,
ADD COLUMN     "independence_level" TEXT NOT NULL,
ADD COLUMN     "pet_images" TEXT[],
DROP COLUMN "age",
ADD COLUMN     "age" TEXT NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Age";

-- DropEnum
DROP TYPE "EnergyLevel";

-- DropEnum
DROP TYPE "Environment";

-- DropEnum
DROP TYPE "IndependenceLevel";

-- DropEnum
DROP TYPE "Size";
