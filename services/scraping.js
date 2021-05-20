"use strict";
const puppeteer = require("puppeteer");
require("colors");

const { scrapingURL } = require("../config/constants");
const { getUpdatedTime } = require("../utils/datetime");

// scraping services
module.exports = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(scrapingURL, { waitUntil: 'load', timeout: 0 });

    const rates = await page.$$eval("th.pt-24 > p", (rates) =>
      rates.map((rate) =>
        rate.innerHTML.split("<br>").map((text) => text.trim())
      )
    );

    const currencies = await page.$$eval("tr", (rows) =>
      rows
        .map((row) => row.getAttribute("code"))
        .filter((currency) => !!currency && currency.length === 3)
    );

    const prices = await page.$$eval("p", (pTags) =>
      pTags
        .filter((pTag) => !!pTag.getAttribute("rate-type"))
        .map((pTag) => pTag.innerHTML)
    );

    await browser.close();
    let index = 0;

    const scrappingData = currencies.map((currency) => ({
      currency,
      rates: rates.map((rate) => {
        const currencyRate = {
          type: rate[0],
          buyPrice: prices[index],
          sellPrice: prices[index + 1],
          updatedAt: getUpdatedTime(rate[1]),
        };
        index += 2;

        return currencyRate;
      }),
    }));

    return scrappingData;
  } catch (error) {
    console.log(`${error}`.red);
    return null;
  }
};
