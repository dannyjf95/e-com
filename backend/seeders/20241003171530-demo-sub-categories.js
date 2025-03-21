"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let categories = [];
    let subCats = [
      { catId: 1, subId: 1, name: "running shoes" },
      { catId: 1, subId: 2, name: "boots" },
      { catId: 3, subId: 3, name: "jeans" },
      { catId: 3, subId: 4, name: "shorts" },
      { catId: 3, subId: 5, name: "jackets" },
      { catId: 2, subId: 6, name: "hats" },
    ];

    for (let i = 0; i < subCats.length; i++) {
      let category_id;
      let name;

      if (subCats[i].subId === 1 || subCats[i].subId === 2) {
        category_id = subCats[i].catId;
        name = subCats[i].name;
      } else if (subCats[i].subId === 3 || subCats[i].subId === 4) {
        category_id = subCats[i].catId;
        name = subCats[i].name;
      } else if (subCats[i].subId === 5) {
        category_id = subCats[i].catId;
        name = subCats[i].name;
      } else if (subCats[i].subId === 6) {
        category_id = subCats[i].catId;
        name = subCats[i].name;
      }

      categories.push({
        name: `${name}`,
        category_id: category_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // console.log(categories)
    await queryInterface.bulkInsert("sub_categories", categories);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
