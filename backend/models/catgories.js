"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //change to sub categories
      Categories.hasMany(models.Sub_categories, {
        foreignKey: "category_id",
        onDelete: "CASCADE",
      });
    }
  }
  Categories.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        default: "category_unnamed",
      },
    },

    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps by default
      },
      sequelize,
      modelName: "Categories",
      tableName: "categories",
      timestamps: true,
    }
  );
  return Categories;
};
