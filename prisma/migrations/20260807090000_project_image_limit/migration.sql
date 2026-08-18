ALTER TABLE "Project" ADD COLUMN "limitImages" BOOLEAN NOT NULL DEFAULT false;

INSERT OR IGNORE INTO "Category" ("id", "name", "slug")
VALUES ('category-pedicure', 'Pédicure', 'pedicure');

INSERT OR IGNORE INTO "Category" ("id", "name", "slug")
VALUES ('category-archive', 'Archive', 'archive');

UPDATE "Category" SET "slug" = 'pedicure' WHERE "id" = 'category-pedicure' AND "slug" != 'pedicure';

UPDATE "Category" SET "slug" = 'archive' WHERE "id" = 'category-archive' AND "slug" != 'archive';
