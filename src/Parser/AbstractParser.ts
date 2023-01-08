import { load, CheerioAPI } from "cheerio";
import PN from "persian-number";

export abstract class AbstractParser {
  protected $: CheerioAPI;

  constructor(html: string) {
    this.$ = load(html);
  }

  protected _isPersianNumber(n: string): boolean {
    const regex = new RegExp("^[\u06F0-\u06F9]+$");
    return regex.test(n);
  }

  protected _stringToNumber(s: string): number {
    if (this._isPersianNumber(s)) {
      return +PN.convertPeToEn(s);
    }
    return +s;
  }

  protected _mapIntValue(int: number) {
    if (isNaN(int) || !int) {
      return null;
    }
    return int;
  }

  protected _getTableItem(name:string){
    return this.$(`th:contains("${name}") + td`).first().text().trim();
  }

  protected _getDate() {
    const attr = this.$("section#item-details time").first().attr();
    if (attr) {
      return new Date(attr["datetime"]);
    }
    return null;
  }

  getItems() {
    const articles = this.$("article.serp-item.list").get();
    return articles.map((article) => ({
      url: article.attribs["data-href"],
      id: article.attribs["id"].split("-")[1],
    }));
  }
}
