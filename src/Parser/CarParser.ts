import { AbstractParser } from "./AbstractParser";

export class CarParser extends AbstractParser {
  constructor(html: string) {
    super(html);
  }

  private _getTitle() {
    return this.$("section#item-details h1").first().text().trim();
  }

  private _getPrice() {
    const content = this.$("span.item-price strong")
      .first()
      .text()
      .trim()
      .split(",")
      .join("");
    return this._mapIntValue(this._stringToNumber(content));
  }

  private _getPaymentType() {
    const content = this._getTableItem("نقدی/اقساطی");
    return content;
  }

  private _getNeighborhood() {
    return this.$("nav#breadcrumbs li:last a").first().text().trim();
  }

  private _getBrand() {
    return this.$("nav#breadcrumbs li").eq(-2).text().trim();
  }

  private _getChassis() {
    const content = this._getTableItem("نوع شاسی");
    return content;
  }

  private _getProductionYear() {
    const content = this._getTableItem("سال تولید");
    return this._mapIntValue(this._stringToNumber(content));
  }

  private _getMileage() {
    const content = this._getTableItem("کیلومتر").split(",").join("");
    return this._mapIntValue(this._stringToNumber(content));
  }

  private _getType() {
    const content = this._getTableItem("مدل خودرو");
    return content;
  }

  private _getColor() {
    const value = this._getTableItem("رنگ");
    return value;
  }

  private _getGearboxType() {
    const value = this._getTableItem("گیربکس");
    return value;
  }

  private _getBodyStatus() {
    const value = this._getTableItem("وضعیت بدنه");
    return value;
  }

  private _getFuelType() {
    const value = this._getTableItem("نوع سوخت");
    return value;
  }

  private _getDescription() {
    const description = this.$("p#description").first().text().trim();
    return description;
  }

  getSingleItem() {
    return {
      title: this._getTitle(),
      price: this._getPrice(),
      date: this._getDate(),
      neighborhood: this._getNeighborhood(),
      paymentType: this._getPaymentType(),
      brand: this._getBrand(),
      chassis: this._getChassis(),
      productionYear: this._getProductionYear(),
      mileage: this._getMileage(),
      type: this._getType(),
      color: this._getColor(),
      gearboxType: this._getGearboxType(),
      bodyStatus: this._getBodyStatus(),
      fuelType: this._getFuelType(),
      description_raw: this._getDescription(),
    };
  }
}
