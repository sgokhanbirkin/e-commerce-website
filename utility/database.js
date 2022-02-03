const mysql = require('mysql2');
const constants = require('./constants');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(constants.database, constants.user, constants.password, {
    dialect: 'mysql',
    host: constants.host
});

module.exports = sequelize;

