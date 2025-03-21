const express = require("express");
const { getSearchResults } = require("../controllers/searchController");
const search = express.Router();

search.get("/", getSearchResults); //completed

module.exports = search;
