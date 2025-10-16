"use strict";

module.exports = (sequelize, DataTypes) => {
  const ShravaniAllColumns2 = sequelize.define(
    "ShravaniAllColumns2",   // ✅ JS model name (PascalCase)
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
            userName: {
        type: DataTypes.STRING(100),
        allowNull: true, // ✅ or false if you want it required
      },
      candidateName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      parentMobileNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      maritalStatus: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,  // ✅ DATEONLY (no time part, just YYYY-MM-DD)
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isEmail: true,      // ✅ Built-in Sequelize validator
        },
      },
      caste_certificate_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      income_certificate_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "shravani_allcolumns2", // ✅ MySQL table name
      timestamps: true,                  // ✅ adds created_at + updated_at
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: false,                // keep camelCase in model, snake_case in DB
    }
  );

  return ShravaniAllColumns2;
};
