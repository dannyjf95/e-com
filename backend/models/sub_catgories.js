"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sub_catgories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sub_catgories.hasMany(models.Items, {
        foreignKey: "sub_category_id",
      });
    }
  }
  Sub_catgories.init(
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
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps by default
      },
      sequelize,
      modelName: "Sub_categories",
      tableName: "sub_categories",
      timestamps: true,
    }
  );

  return Sub_catgories;
};
