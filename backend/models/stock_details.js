"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock_details extends Model {
    static associate(models) {
      Stock_details.belongsTo(models.Items, {
        foreignKey: "item_id",
      });
    }
  }
  
  Stock_details.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true, //beenie hat for ecample some come in one size
      },
      color: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Stock_details",
      tableName: "stock_details",
    }
  );
  return Stock_details;
};
