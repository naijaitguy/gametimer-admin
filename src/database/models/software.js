module.exports = (sequelize, DataTypes) => {
  const Software = sequelize.define('Software', {
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    minimumAppVersion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maximumAppVersion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    software: {
      type: DataTypes.STRING(500000),
      allowNull: false,
    },
  }, {});

  return Software;
};
