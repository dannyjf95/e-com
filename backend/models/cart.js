"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // define association here
      Cart.hasMany(models.Cart_items, {
        foreignKey: "cart_id",
      });
      Cart.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps by default
      },
      sequelize,
      modelName: "Cart",
      tableName: "carts",
      timestamps: true,
    }
  );
  return Cart;
};
