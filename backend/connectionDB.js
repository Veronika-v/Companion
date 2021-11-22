const Sequelize = require("sequelize");
const sequelize = new Sequelize("sql11450327", "sql11450327", "AWcsAgjxKi", {
    dialect: "mysql",
    host: "sql11.freesqldatabase.com"
});

module.exports = sequelize;