

const { createHash } = require('crypto');
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Device.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }


  Device.init( { 
  //const Device = sequelize.define('Device', {
    serialNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    holidayMode: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    volume: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    flightMode: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    chipNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAge: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['assigning', 'assigned', 'unassigned'],
      defaultValue: 'assigning',
    },
  
  }, 
  
  {
    sequelize,
    modelName: 'Device',
    tableName:'Devices'
  });



  return Device;
};
