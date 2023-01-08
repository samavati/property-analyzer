import fs from "fs";
import path from "path";
import { CarParser } from "./Parser/CarParser";

async function main() {
  const html = fs.readFileSync(path.join(__dirname, "./test.html"), "utf-8");
  const parser = new CarParser(html);
  console.log(parser.getSingleItem())
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
