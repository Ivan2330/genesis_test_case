'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    // This can be used for associations if needed later
    static associate(models) {
      // No relations for now
    }
  }

  Subscription.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      frequency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['daily', 'hourly']] // Just to be safe
        }
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Subscription',
      tableName: 'subscriptions',
      timestamps: true // Adds createdAt and updatedAt
    }
  );

  return Subscription;
};
