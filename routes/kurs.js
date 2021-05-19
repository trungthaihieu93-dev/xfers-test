"use strict";
const router = require("express").Router();

router.get("/", (req, res) => res.send("Kurs API!"));

module.exports = router;
