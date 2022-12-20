import { load, CheerioAPI } from "cheerio";

export class Parser {
  private $: CheerioAPI;

  constructor(html: string) {
    this.$ = load(html);
  }

  private _mapBooleanValues(value: string) {
    if (value === "دارد") {
      return true;
    }
    return false;
  }

  private _mapIntValue(int: number) {
    if (isNaN(int) || !int) {
      return null;
    }
    return int;
  }

  private _getTitle() {
    return this.$("section#item-details h1").first().text();
  }

  private _getDate() {
    const attr = this.$("section#item-details time").first().attr();
    if (attr) {
      return attr["datetime"];
    }
    return null;
  }

  private _getDistrict() {
    return this.$("section#item-details time + span").first().text();
  }

  private _getSpace() {
    return this._mapIntValue(
      +this.$('th:contains("متراژ") + td').first().text().trim()
    );
  }

  private _getRooms() {
    return this._mapIntValue(
      +this.$('th:contains("تعداد اتاق") + td').first().text().trim()
    );
  }

  private _getParking() {
    const parking = this.$('th:contains("پارکینگ") + td').first().text().trim();
    return this._mapBooleanValues(parking);
  }

  private _getWarehouse() {
    const warehouse = this.$('th:contains("انباری") + td')
      .first()
      .text()
      .trim();
    return this._mapBooleanValues(warehouse);
  }

  private _getElevator() {
    const value = this.$('th:contains("آسانسور") + td').first().text().trim();
    return this._mapBooleanValues(value);
  }

  private _getAge() {
    const age = this.$('th:contains("سن بنا") + td').first().text().trim();
    if (age === "نوساز") {
      return 0;
    }
    return this._mapIntValue(+age.replace(" سال", ""));
  }

  private _getPricePerMeter() {
    return +this.$('th:contains("قیمت هر متر") + td')
      .first()
      .text()
      .trim()
      .split(",")
      .join("");
  }

  private _parseDescription() {
    const description = this.$("p#description").first().text().trim();
    const separated = description.split("\n");
    const items: Record<string, string> = {};
    for (const item of separated) {
      if (item.includes(":")) {
        const keyed = item.split(":");
        items[keyed[0].trim()] = keyed[1].trim();
      }
    }
    items["raw"] = description;
    return items;
  }

  private _getFloor() {
    const value = this._parseDescription()["طبقه ملک"];
    return this._mapIntValue(+value);
  }

  private _getTotalFloors() {
    const value = this._parseDescription()["تعداد طبقات"];
    return this._mapIntValue(+value);
  }

  getSingleItem() {
    return {
      title: this._getTitle(),
      date: this._getDate(),
      district: this._getDistrict(),
      space: this._getSpace(),
      rooms: this._getRooms(),
      parking: this._getParking(),
      warehouse: this._getWarehouse(),
      elevator: this._getElevator(),
      age: this._getAge(),
      pricePerMeter: this._getPricePerMeter(),
      floor: this._getFloor(),
      total_floors: this._getTotalFloors(),
      description_raw: this._parseDescription()["raw"],
    };
  }

  getItems() {
    const articles = this.$("article.serp-item.list").get();
    return articles.map((article) => ({
      url: article.attribs["data-href"],
      id: article.attribs["id"].split("-")[1],
    }));
  }
}
