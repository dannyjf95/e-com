"use strict";
const sequelize = require("../config/db");
const User = require("../models/user")(
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
    await queryInterface.bulkDelete("orders", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "orders_id_seq" RESTART WITH 1'
    );
    const all = await User.findAll();
    const first = await all[0].id;
    queryInterface.bulkInsert("orders", [
      {
        user_id: first,
        guest_id: null,
        order_total: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
