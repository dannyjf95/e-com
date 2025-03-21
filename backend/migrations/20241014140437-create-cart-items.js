module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cart_items", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cart_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "carts", // Reference to the carts table
          key: "id",
        },
        onDelete: "CASCADE", // Handle deletion of carts/items properly
        allowNull: false, // Ensure it is not null
      },
      item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "items", // Reference to the items table
          key: "id",
        },
        onDelete: "CASCADE", // Recommended to prevent orphaned records
        allowNull: false, // Ensure it is not null
      },
      item_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cart_items");
  },
};
