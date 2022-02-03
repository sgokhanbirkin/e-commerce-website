const mysql = require('mysql2');
const constants = require('./constants');

const connection = mysql.createConnection({
    host: constants.host,
    user: constants.user,
    database: constants.database,
    password: constants.password,
});

module.exports = connection.promise();