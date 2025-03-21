"use strict";
const { Model } = require("sequelize");
// const sequelize = require("../config/db"); // Import the Sequelize instance
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.hasMany(models.Order_items, {
        foreignKey: "item_id",
      });
      Items.belongsTo(models.Sub_categories, {
        foreignKey: "sub_category_id",
      });
      Items.hasMany(models.Cart_items, { foreignKey: "item_id" });

      Items.hasMany(models.Stock_details, {
        foreignKey: "item_id",
      });

      // Items.belongsTo(models.Cart_items, {
      //   foreignKey: "item_id",
      // });
    }
  }
  Items.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
     

      sub_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sub_categories",
          key: "id",
        },
      },
    },
    //stock available HERE
    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps by default
      },
      sequelize,
      modelName: "Items",
      tableName: "items",
      timestamps: true,
    }
  );
  return Items;
};
