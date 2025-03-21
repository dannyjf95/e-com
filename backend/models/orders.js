"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });

      Orders.belongsTo(models.Guest_user, {
        foreignKey: "guest_id",
        onDelete: "CASCADE",
      });
      Orders.hasMany(models.Order_items, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
      });
    }
  }

  //alter table to include shipping_deatils table linked via shipping_id
  Orders.init(
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
      guest_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "guest_users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      order_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps by default
      },
      sequelize,
      modelName: "Orders",
      tableName: "orders",
      timestamps: true,
    }
  );
  return Orders;
};
