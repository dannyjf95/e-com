const express = require("express");
const category = express.Router();

const {
  getCategories,
  getCategory,
  getSubCatsAndItems,
  // getSubCategories,
} = require("../controllers/categoryController");

//catname = footware / headware / clothing
//subcatename = running shoes / boots / jeans / shorts / jackets / hats

category.get("/", getCategories); //complete
category.get("/:catname", getCategory); //complete
category.get("/:catname/:subcatname", getSubCatsAndItems); //complete

// category.get(":subcat/items", getSubCatsAndItems);

module.exports = category;
