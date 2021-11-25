const Sequelize = require("sequelize");
const sequelize = new Sequelize("sql11450327", "sql11450327", "AWcsAgjxKi", {
    dialect: "mysql",
    host: "sql11.freesqldatabase.com",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;