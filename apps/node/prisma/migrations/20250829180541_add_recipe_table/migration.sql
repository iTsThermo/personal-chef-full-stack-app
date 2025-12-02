-- AlterTable
ALTER TABLE "public"."ingredients" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "public"."recipes" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" JSONB NOT NULL,
    "steps" TEXT[],

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);
