ALTER TABLE "Project" ADD COLUMN "limitImages" BOOLEAN NOT NULL DEFAULT false;

INSERT OR IGNORE INTO "Category" ("id", "name", "slug")
VALUES ('category-pedicure', 'Pédicure', 'pedicure');

INSERT OR IGNORE INTO "Category" ("id", "name", "slug")
VALUES ('category-archive', 'Archive', 'archive');
