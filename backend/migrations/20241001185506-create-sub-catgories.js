"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sub_categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
        defaultValue: "category_unnamed",
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  // Modify the down method
  async down(queryInterface, Sequelize) {
    // First remove the foreign key constraint
    await queryInterface.removeConstraint(
      "sub_categories",
      "sub_categories_category_id_fkey"
    );

    // Then drop the sub_categories table
    await queryInterface.dropTable("sub_categories");
  },
};
