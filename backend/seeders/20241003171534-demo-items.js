"use strict";
const sequelize = require("../config/db");
const Items = require("../models/items")(
  sequelize,
  require("sequelize").DataTypes
);
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
    queryInterface.bulkDelete("items", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "items_id_seq" RESTART WITH 1'
    );

    let items = [];
    let name = [
      "nike running shoes",
      "adidas running shoes",
      "walking boots",
      "football boots",
      "black bomber jacket",
      "ripped jeans",
      "white washed jeans",
      "ripped denim shorts",
      "beanie hat",
      "baseball hat",
    ];
    for (let i = 0; i < name.length; i++) {
      let sub_category_id;
      if (name[i].includes("running shoes")) {
        sub_category_id = 1;
      } else if (name[i].includes("boots")) {
        sub_category_id = 2;
      } else if (name[i].includes("jeans")) {
        sub_category_id = 3;
      } else if (name[i].includes("shorts")) {
        sub_category_id = 4;
      } else if (name[i].includes("jacket")) {
        sub_category_id = 5;
      } else if (name[i].includes("hat")) {
        sub_category_id = 6;
      }
      items.push({
        name: `${name[i]}`,
        price: Math.floor(Math.random() * 41 + 10),
        sub_category_id: sub_category_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    queryInterface.bulkInsert("items", items);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete("items", null, {});
  },
};
