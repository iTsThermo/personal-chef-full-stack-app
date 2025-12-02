/*
  Warnings:

  - The `ingredients` column on the `recipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."recipes" DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" JSONB[];
