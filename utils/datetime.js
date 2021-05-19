"use strict";

module.exports = {
  getUpdatedTime: (dateString) =>
    new Date(dateString
      .replace("WIB", "")
      .replace("/", "")
      .replace('<span class="a-text a-text-micro color-white">', '')
      .replace('</span>', '')
      .trim()),
};
