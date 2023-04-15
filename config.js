sql = require("mysql");

let connection = sql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'aamasoom.484',
    database: 'test'
});

module.exports = connection;