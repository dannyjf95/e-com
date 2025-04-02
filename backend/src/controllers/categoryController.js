const models = require("../../models");

//handles categories, categories->sub_categories->items
const Category = require("../services/category/CategoryServices");
const categories = new Category();

async function getCategories(req, res) {
  try {
    const result = await categories.getCategories();
    if (!result) {
      return res.status(404).json({ message: "categories not found" });
    }

    return res.status(200).json({ categories: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
async function getCategory(req, res) {
  try {
    const result = await categories.getCategory(req.params.catname);

    if (!result) {
      return res.status(404).json({ message: "categories not found" });
    }

    return res.status(200).json({ category: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

async function getSubCategories(req, res) {
  try {
    const result = await categories.getSubCategories();
    if (!result) {
      return res.status(404).json({ message: "categories not found" });
    }

    return res.status(200).json({ categories: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

async function getSubCatsAndItems(req, res) {
  // console.log(123)
  try {
    const result = await categories.getSubCatItems(req.params);

    if (!result) {
      return res.status(404).json({ message: "categories not found" });
    }

    return res.status(200).json({ items: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  getCategories,
  getCategory,
  getSubCatsAndItems,
  getSubCategories,
};
