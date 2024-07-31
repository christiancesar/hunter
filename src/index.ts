import { prisma } from "@shared/database/prisma";
import { interceptErrorMiddleware } from "@shared/middlewares/interceptErrorMiddleware";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import { routes } from "./routes";

const server = express();
server.use(cors());
server.use(express.json());
server.use(routes);
server.use(interceptErrorMiddleware);

async function main() {
  await prisma.$connect();
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
