"use strict";

module.exports = {
  getUpdatedTime: (dateString) =>
    new Date(dateString.replace("WIB", "").replace("/", "").trim()),
};
