const express = require("express");
const items = express.Router();

const { getItem, getItems } = require("../controllers/itemController");

items.get("/all", getItems);
items.get("/:id", getItem);

module.exports = items;
