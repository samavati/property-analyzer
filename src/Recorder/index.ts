import { PrismaClient } from "@prisma/client";
import { SingleBar, Presets } from "cli-progress";
import { Spinner } from "cli-spinner";
import colors from "colors/safe";
import { Queue } from "@samavati/tsds";
import { Crawler } from "../Crawler";
import { sleep } from "../utils";

const prisma = new PrismaClient();

export class Recorder {
  private _seen: Map<string, boolean> = new Map();
  private items: Queue<{ url: string; id: string }> = new Queue();
  private _progressBar = new SingleBar({}, Presets.shades_classic);
  constructor(private _crawler: Crawler) {}

  private _hasSeen(id: string) {
    return this._seen.has(id);
  }

  private _setSeen(id: string) {
    this._seen.set(id, true);
  }

  private async _init() {
    const seen = await prisma.property.findMany();
    for (const item of seen) {
      this._setSeen(item.id);
    }
  }

  private async getAllPages(pages: number) {
    console.log(colors.green("crawling all pages ..."));
    this._progressBar.start(pages, 0);
    for (let i = 1; i < pages + 1; i++) {
      const items = await this._crawler.extractItems(i);

      for (const item of items) {
        this.items.enqueue(item);
      }
      this._progressBar.update(i);
      await sleep(3000);
    }
    this._progressBar.stop();
  }

  private async _record(pages: number) {
    await this.getAllPages(pages);
    console.log(colors.green("crawling all items ..."));
    let item: { url: string; id: string };
    const total = this.items.length;
    this._progressBar.start(total, 0);
    while (this.items.length > 0) {
      item = this.items.dequeue();
      if (!this._hasSeen(item.id)) {
        try {
          const detail = await this._crawler.extractItem(item.url);
          await prisma.property.create({
            data: {
              id: item.id,
              url: item.url,
              ...detail,
            },
          });
        } catch (error) {
          continue;
        }

        this._setSeen(item.id);
        this._progressBar.update(total - this.items.length);
        await sleep(3000);
      }
    }
    this._progressBar.stop();
  }

  async start(pages: number) {
    await this._init();
    await this._record(pages);
  }
}
