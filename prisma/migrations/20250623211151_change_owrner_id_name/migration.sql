/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Pets` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pets" DROP CONSTRAINT "Pets_ownerId_fkey";

-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "ownerId",
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "petImages" TEXT[],
ADD COLUMN     "requirements" TEXT[];

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
