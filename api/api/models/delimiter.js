module.exports = function (sequelize, DataTypes) {
  const Delimiter = sequelize.define('delimiter', {
    property: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
  }, {
    tableName: 'delimiter',
    underscored: true,
    classMethods: {
      associate: (models) => {
        Delimiter.belongsToMany(models.locale, { 
          through: 'locale_delimiter',
          as: 'locales',
          foreignKey:'locale_id',
          otherKey: 'delimiter_id',
        });
      },
    },
  });
  return Delimiter;
};
