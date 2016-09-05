module.exports = function (sequelize, DataTypes) {
  const Locale_Delimiter = sequelize.define('locale_delimiter', {
    locale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delimiter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'locale_delimiter',
    underscored: true,
    classMethods: {
      associate: (models) => {
        Locale_Delimiter.belongsTo(models.locale)
        Locale_Delimiter.belongsTo(models.delimiter)
      },
    },
  });
  return Locale_Delimiter;
};
