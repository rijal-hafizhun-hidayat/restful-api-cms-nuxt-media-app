import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prisma.$on("error", (e: Prisma.LogEvent) => {
  console.error(e);
});

prisma.$on("warn", (e: Prisma.LogEvent) => {
  console.warn(e);
});

prisma.$on("info", (e: Prisma.LogEvent) => {
  console.info(e);
});

prisma.$on("query", (e: Prisma.QueryEvent) => {
  console.info(e);
});
