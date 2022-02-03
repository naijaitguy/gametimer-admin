const { createHash } = require('crypto');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }

   User.init({

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isHash: 'sha256' },
    },
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    language: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      valaidate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    phonePrefix: DataTypes.STRING,
    salutation: DataTypes.STRING,
    newsletter: DataTypes.BOOLEAN,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
      sequelize,
      modelName: 'User',
    }
  );


 
  return User;
};
