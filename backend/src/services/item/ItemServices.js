const { where } = require("sequelize");
const models = require("../../../models");

class Item {
  constructor(items) {
    this.items = items;
  }

  async getAllItems() {
    const result = await models.Items.findAll({
      order: [["id", "asc"]],
      limit: 5
    });
    this.items = result;

    return result;
  }
  
  async getItem(req) {
    return await models.Items.findOne({
      where: { id: 1 },
    });
  }
}

module.exports = Item;
