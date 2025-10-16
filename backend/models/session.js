// models/session.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: 'awaiting_gender',
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'sessions',
    underscored: true,
    timestamps: true // will use createdAt/updatedAt
  });

  return Session;
};
