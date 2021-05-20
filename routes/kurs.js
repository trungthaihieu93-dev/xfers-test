"use strict";
const router = require("express").Router();
const {
  handleRead,
  handleCreate,
  handleUpdate,
  handleDeleteByDate,
} = require('../controllers/kurs');

router.get("/", (req, res) => res.send("Kurs API!"))
  .post('/', handleCreate)
  .put('/', handleUpdate)
  .delete('/:date', handleDeleteByDate);

module.exports = router;
