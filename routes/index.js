"use strict";

const { Router } = require("express");
const router = Router();
const Event = require("../models/event");

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
