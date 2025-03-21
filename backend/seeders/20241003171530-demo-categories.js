"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    queryInterface.bulkDelete("categories", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "categories_id_seq" RESTART WITH 1'
    );
    let categories = [];
    let categoriesNames = ["footware", "headwear", "clothing"];
    for (let i = 0; i < categoriesNames.length; i++) {
      console.log;
      categories.push({
        name: `${categoriesNames[i]}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    // console.log(categories)
    await queryInterface.bulkInsert("categories", categories);
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
