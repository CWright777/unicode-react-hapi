module.exports = function (sequelize, DataTypes) {
  const Script = sequelize.define('script', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'script',
    underscored: true,
    classMethods: {
      associate: (models) => {
        Script.hasMany(models.locale); 
      },
    },
  });
  return Script;
};
