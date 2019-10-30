var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'dbproject',
        password: 'dbproject',
        server: 'localhost',
        database: 'test'
    });

    return conn;
};

module.exports = connect;