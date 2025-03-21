const models = require("../../models");
const { Op } = require("sequelize");

const Item = require("../services/item/ItemServices");
const itemInstance = new Item();

const getItems = async (req, res) => {
  //convert to get all and specific searches
  try {
    const result = await itemInstance.getAllItems();

    if (!result) {
      return res.status(404).json({ message: "items not found" });
    }

    return res.status(200).json({ items: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getItem = async (req, res) => {
  //convert to get all and specific searches
  
  try {
    const result = await  itemInstance.getItem(req);
console.log(result)
    if (!result) {
      return res.status(404).json({ message: "items not found" });
    }

    return res.status(200).json({ item: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getItems,
  getItem,
};
