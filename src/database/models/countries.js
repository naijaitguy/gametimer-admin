module.exports = (sequelize, DataTypes) => {
  const Countries = sequelize.define('Countries', {
    code: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
  }, {});
  return Countries;
};
