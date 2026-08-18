import "dotenv/config";
import { defineConfig } from "prisma/config";

const migrationDatabaseUrl = process.env.PRISMA_MIGRATION_DATABASE_URL || "file:./dev.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: migrationDatabaseUrl,
  },
});
