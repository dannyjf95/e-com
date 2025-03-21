"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Guest_user extends Model {
    static associate(models) {
      // define association here
      Guest_user.hasMany(models.Orders, {
        foreignKey: "guest_id",
      });
    }
  }
  Guest_user.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Guest_user",
      tableName: "guest_users",
    }
  );
  return Guest_user;
};
