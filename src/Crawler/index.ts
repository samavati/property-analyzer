import axios from "axios";
import axiosRetry from "axios-retry";
import { CarParser } from "../Parser/CarParser";

axiosRetry(axios, { retries: 10, retryDelay: (count) => count * 100 });

export class Crawler {

  constructor(private baseURL: string) {}

  async extractItem(url: string) {
    const { data: html } = await axios.get<string>(url);
    const detail = new CarParser(html).getSingleItem();
    return detail;
  }

  async extractItems(page: number = 1, date: number) {
    const { data: html } = await axios.get<string>(this.baseURL, {
      params: { p: page, f: date },
    });

    try {
      if (html) {
        return new CarParser(html).getItems();
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  }
}
