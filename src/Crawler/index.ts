import axios from "axios";
import axiosRetry from "axios-retry";
import { BASE_URL } from "../constants";
import { Parser } from "../Parser";

axiosRetry(axios, { retries: 10, retryDelay: (count) => count * 100 });

export class Crawler {
  async extractItem(url: string) {
    const { data: html } = await axios.get<string>(url);
    const detail = new Parser(html).getSingleItem();
    return detail;
  }

  async extractItems(page: number = 1) {
    const { data: html } = await axios.get<string>(BASE_URL, {
      params: { p: page },
    });

    try {
      if (html) {
        return new Parser(html).getItems();
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  }
}
