"use strict";
const models = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Reset the sequence to avoid potential conflicts with IDs
    queryInterface.bulkDelete("stock_details", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "stock_details_id_seq" RESTART WITH 1'
    );
    const stockDetails = [];
    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const clothingSizes = ["S", "M", "L"];
    const shoeSizes = ["8", "8.5", "9"];
    const colors = ["white", "black", "grey"];
    for (let i = 0; i < ids.length; i++) {
      const item = await models.Items.findOne({
        where: { id: ids[i] },
        raw: true,
      });
      if (item.sub_category_id === 1 || item.sub_category_id === 2) {
        for (let k = 0; k < shoeSizes.length; k++) {
          stockDetails.push({
            item_id: ids[i],
            stock_quantity: 50,
            size: shoeSizes[k],
            color: colors[k],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      } else {
        for (let j = 0; j < clothingSizes.length; j++) {
          stockDetails.push({
            item_id: ids[i],
            stock_quantity: 50,
            size: clothingSizes[j],
            color: colors[j],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }

    await queryInterface.bulkInsert("stock_details", stockDetails, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stock_details", null, {});
  },
};
