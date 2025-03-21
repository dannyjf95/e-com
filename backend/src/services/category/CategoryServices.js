const { where } = require("sequelize");
const models = require("../../../models");
//convert to one call and tailor of that
class Category {
  async getCategories() {
    return await models.Categories.findAndCountAll({
      order: [["id", "asc"]],
    });
  }

  async getSubCategories() {
    const allCats = await models.Categories.findAndCountAll({
      include: {
        model: models.Sub_categories,
      },
      order: [["id", "asc"]],
    });

    return allCats.rows.map((cat) => ({
      id: cat.id,
      name: cat.name,
      subCats: allCats.rows[0].Sub_categories.map((sub) => ({
        id: sub.id,
        name: sub.name,
        paretnCatId: sub.category_id,
      })).sort((a, b) => a.id - b.id),
    }));
  }

  async getCategory(name) {
    const result = await models.Categories.findOne({
      where: { name },
      include: [models.Sub_categories],
    });
    return result;
  }

  async getSubCatItems(subname) {
    // console.log(subname);
    const result = await models.Sub_categories.findAll({
      include: [models.Items],
      where: { name: subname },
    });
    return result;
  }
}

module.exports = Category;
