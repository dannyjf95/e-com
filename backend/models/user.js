"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define association here if needed
      User.hasMany(models.Orders, {
        foreignKey: "user_id",
      });

      User.hasOne(models.Orders, {
        //just for individual checking
        foreignKey: "user_id",
      });

      User.hasOne(models.Cart, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      googleId: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps by default
      },
      sequelize, // Use the Sequelize connection
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );
  User.prototype.validPassword = function (password) {
    return this.password === password;
  };
  return User;
};
