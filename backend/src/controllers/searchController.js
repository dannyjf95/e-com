const models = require("../../models");
// const { Op } = require("sequelize");
const Search = require("../services/search/searchService");

const getSearchResults = async (req, res) => {
  const isQuery = req.query.q ?? ''
  let searchTerms = isQuery.split(" ").map((term) => term)

  let terms = [...searchTerms];
  let lastString = searchTerms[searchTerms.length - 1];
  lastString[lastString.length - 1] === "s" //pluralize checks
    ? terms.push((lastString = lastString.split("").slice(0, -1).join("")))
    : null;

  const searchInstance = new Search(terms);
  try {
    // const items = await searchInstance.itemResults();
    // const categories = await searchInstance.categoryResults();
    // const subCategories = await searchInstance.subCategoryResultls();

    const allSearchResults = await searchInstance.findAllSearch();
    if (!allSearchResults.length === 0) {
      return res.status(404).json({ message: "items not found" });
    }

    return res.status(200).json({
      "search results": allSearchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getSearchResults,
};
