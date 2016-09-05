module.exports = function (sequelize, DataTypes) {
  const Territory = sequelize.define('territory', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'territory',
    underscored: true,
    classMethods: {
      associate: (models) => {
        Territory.hasMany(models.locale); 
      },
    },
  });
  return Territory;
};
