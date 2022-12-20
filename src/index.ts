import { PrismaClient } from "@prisma/client";
import { Crawler } from "./Crawler";
import { Recorder } from "./Recorder";

const prisma = new PrismaClient();

async function main() {
  const crawler = new Crawler();
  const recorder = new Recorder(crawler);
  await recorder.start(3);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
