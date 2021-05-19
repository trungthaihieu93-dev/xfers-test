"use strict";
const router = require("express").Router();

const { handleIndexing } = require("../controllers/indexing");

router.get("/", handleIndexing);

module.exports = router;
