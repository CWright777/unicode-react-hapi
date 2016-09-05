module.exports = function (sequelize, DataTypes) {
  const Language = sequelize.define('language', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'language',
    underscored: true,
    classMethods: {
      associate: (models) => {
        Language.hasMany(models.locale); 
      },
    },
  });
  return Language;
};
