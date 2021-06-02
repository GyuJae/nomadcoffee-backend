/*
  Warnings:

  - Made the column `categoryId` on table `CoffeeShop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" ALTER COLUMN "categoryId" SET NOT NULL;
