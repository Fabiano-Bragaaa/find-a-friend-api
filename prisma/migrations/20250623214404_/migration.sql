/*
  Warnings:

  - You are about to drop the column `energy_Level` on the `Pets` table. All the data in the column will be lost.
  - Added the required column `energy_level` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "energy_Level",
ADD COLUMN     "energy_level" TEXT NOT NULL;
