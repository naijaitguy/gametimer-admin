



const { createHash } = require('crypto');
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class DeviceLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DeviceLogs.belongsTo(models.Device, { foreignKey: 'serialNumber', as: 'device' });
    }
  }

  DeviceLogs.init({

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    raw: DataTypes.STRING,
    loggingId: DataTypes.INTEGER,
    recordType: DataTypes.INTEGER,
    timeStamp: DataTypes.DATE,
    endTime: DataTypes.DATE,
    actions: DataTypes.JSON,
    timezoneOffset: DataTypes.INTEGER,
    logId: DataTypes.INTEGER,
    logRange: DataTypes.STRING,
  }, { 
    sequelize,
    modelName: 'DeviceLogs',
  });

  return DeviceLogs;
};
