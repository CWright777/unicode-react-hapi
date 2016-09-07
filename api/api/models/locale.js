module.exports = function (sequelize, DataTypes) {
  const Locale = sequelize.define('locale', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'locale',
    underscored: true,
    classMethods: {
      associate: (models) => {
        Locale.belongsToMany(models.delimiter, { 
          through: 'locale_delimiter',
          as: 'delimiters',
          foreignKey:'delimiter_id',
          otherKey: 'locale_id',
          //constraints: false
        });
        Locale.belongsTo(models.language)
        Locale.belongsTo(models.territory)
        Locale.belongsTo(models.script)
      },
    },
  });
  return Locale;
};
