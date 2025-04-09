const { where } = require("sequelize");
const models = require("../../../models");
const { Op } = require("sequelize");

class Search {
  constructor(terms) {
    this.terms = terms || null;
    this.results = null;
  }
  async findAllSearch() {
    // console.log(await this.itemResults());
    return {
      items: (await this.itemResults()) ?? "No items found",
      categories: (await this.categoryResults()) ?? "No categories found",
      subCategories:
        (await this.subCategoryResultls()) ?? "No sub categories found",
    };
  }
  
  async itemResults() {
    return models.Items.findAll({
      where: {
        name: {
          [Op.or]: this.terms.map((term) => ({
            [Op.like]: `%${term}%`,
          })),
        },
      },
      order:[['id', 'asc']],
      raw: true,
    });
  }
 
  async categoryResults() {
    return await models.Categories.findAll({
      where: {
        name: {
          [Op.or]: this.terms.map((term) => ({
            [Op.like]: `%${term}%`,
          })),
        },
      },
      raw: true,
    });
  }

  async subCategoryResultls() {
    return await models.Sub_categories.findAll({
      where: {
        name: {
          [Op.or]: this.terms.map((term) => ({
            [Op.like]: `%${term}%`,
          })),
        },
      },
      raw: true,
    });
  }
}

module.exports = Search;
