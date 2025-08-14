/*
  Warnings:

  - You are about to drop the column `department_id` on the `communes` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `communes` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `communes` table. All the data in the column will be lost.
  - Added the required column `department_code` to the `communes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "communes" DROP CONSTRAINT "communes_department_id_fkey";

-- AlterTable
ALTER TABLE "communes" DROP COLUMN "department_id",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "department_code" TEXT NOT NULL,
ALTER COLUMN "population" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "communes" ADD CONSTRAINT "communes_department_code_fkey" FOREIGN KEY ("department_code") REFERENCES "departments"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
