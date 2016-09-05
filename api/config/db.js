module.exports = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  dialect: 'postgres',
  port: 5432,
  models: 'api/models/**/*.js',
  sequelize: {
    define: {
      underscoredAll: true,
    },
  },
};
