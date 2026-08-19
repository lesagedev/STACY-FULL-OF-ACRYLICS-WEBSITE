ALTER TABLE "Image" ADD COLUMN "deletedAt" DATETIME;

CREATE INDEX "Image_deletedAt_idx" ON "Image"("deletedAt");
