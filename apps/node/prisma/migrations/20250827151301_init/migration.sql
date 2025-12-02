-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "ingredient" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "measurement" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
