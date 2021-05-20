"use strict";
const router = require("express").Router();
const {
  handleRead,
  handleCreate,
  handleUpdate,
  handleDeleteByDate,
} = require('../controllers/kurs');

router.get("/", handleRead)
  .post('/', handleCreate)
  .put('/', handleUpdate)
  .delete('/:date', handleDeleteByDate);

module.exports = router;
