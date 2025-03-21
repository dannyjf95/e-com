"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_items.belongsTo(models.Orders, {
        foreignKey: "order_id",
      });
      Order_items.belongsTo(models.Items,  {
        foreignKey: "item_id"
      })
    }
  }
  Order_items.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
      },
      item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "items",
          key: "id",
        },
      },
      item_quantity: {
        type: DataTypes.INTEGER,
      },
      item_size:  {
        type:  DataTypes.STRING
      }
      ,
      price_per_item: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps by default
      },
      sequelize,
      modelName: "Order_items",
      tableName: "order_items",
      timestamps: true,
    }
  );
  return Order_items;
};
