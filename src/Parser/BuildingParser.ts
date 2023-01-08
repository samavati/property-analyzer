import { AbstractParser } from "./AbstractParser";

export class BuildingParser extends AbstractParser {
  constructor(html: string) {
    super(html);
  }

  private _mapBooleanValues(value: string) {
    if (value === "دارد") {
      return true;
    }
    return false;
  }

  private _getTitle() {
    return this.$("section#item-details h1").first().text();
  }

  private _getDistrict() {
    return this.$("section#item-details time + span").first().text();
  }

  private _getSpace() {
    const space = this._getTableItem("متراژ");
    return this._mapIntValue(this._stringToNumber(space));
  }

  private _getRooms() {
    const rooms = this._getTableItem("تعداد اتاق");
    return this._mapIntValue(this._stringToNumber(rooms));
  }

  private _getParking() {
    const parking = this._getTableItem("پارکینگ");
    return this._mapBooleanValues(parking);
  }

  private _getWarehouse() {
    const warehouse = this._getTableItem("انباری");
    return this._mapBooleanValues(warehouse);
  }

  private _getElevator() {
    const value = this._getTableItem("آسانسور");
    return this._mapBooleanValues(value);
  }

  private _getAge() {
    const age = this._getTableItem("سن بنا");
    if (age === "نوساز") {
      return 0;
    }
    const ageNumber = age.replace(" سال", "");
    return this._mapIntValue(this._stringToNumber(ageNumber));
  }

  private _getPricePerMeter() {
    const price = this._getTableItem("قیمت هر متر").split(",").join("");
    return this._mapIntValue(this._stringToNumber(price));
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
    return this._mapIntValue(this._stringToNumber(value));
  }

  private _getTotalFloors() {
    const value = this._parseDescription()["تعداد طبقات"];
    return this._mapIntValue(this._stringToNumber(value));
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
}
