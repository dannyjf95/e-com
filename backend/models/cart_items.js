"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_items extends Model {
    static associate(models) {
      // Each Cart_items record belongs to an Item
      Cart_items.belongsTo(models.Items, {
        foreignKey: "item_id",
      });

      // Each Cart_items record belongs to a Cart
      Cart_items.belongsTo(models.Cart, {
        foreignKey: "cart_id",
      });
    }
  }

  Cart_items.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "carts",
          key: "id",
        },
        allowNull: false,
      },
      item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "items",
          key: "id",
        },
        allowNull: false,
      },
      item_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps by default
      },
      sequelize,
      modelName: "Cart_items",
      tableName: "cart_items",
      timestamps: true,
    }
  );

  return Cart_items;
};
