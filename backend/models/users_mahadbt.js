// // models/users_mahadbt.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../db");

// const UserMahadbt = sequelize.define(
//   "UserMahadbt",
//   {
//     user_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password_hash: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     tableName: "users_mahadbt",
//     timestamps: false,
//   }
// );

// module.exports = UserMahadbt;


// models/users_mahadbt.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserMahadbt = sequelize.define(
    "UserMahadbt",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users_mahadbt",
      timestamps: false,
    }
  );

  return UserMahadbt;
};
