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
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "users_id_seq" RESTART WITH 1'
    );
    queryInterface.bulkInsert("users", [
      {
        name: "dan",
        username: "dan",
        email: "dan@dan.com",
        password: "dan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "a",
        username: "a",
        email: "a@a.com",
        password: "a",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "b",
        username: "b",
        email: "b@b.com",
        password: "b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "c",
        username: "c",
        email: "c@c.com",
        password: "c",
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
