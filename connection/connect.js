var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'dbproject',
        password: 'Dbproject1234',
        server: 'localhost',
        database: 'test'
    });

    return conn;
};

module.exports = connect;
