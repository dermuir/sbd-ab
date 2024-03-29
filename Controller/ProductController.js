var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();

var routes = function () {
    router.route('/')
        .get(function (req, res) {
            conn.connect().then(function () {
                var sqlQuery = "SELECT * FROM Products";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
        });

    router.route('/login')
        .post(function (req, res) {
            var username = req.body.ProductName;
            var password = req.body.ProductPrice;
            conn.connect().then(function () {
                var sqlQuery = "SELECT * FROM accounts where username = '" + username + "' and password = '" + password + "'";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    if(recordset.recordset.length > 0){
                        res.status(200).send({success : "true"});
                    }else{
                        res.status(200).send({success : "false"});
                    }
                    //res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
        });
    

    router.route('/:id')
        .get(function (req, res) {
                        var _productID = req.params.id;
            conn.connect().then(function () {
                                var sqlQuery = 'SELECT * FROM Products where ProductID = ' + _productID;
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
        });


    router.route('/')
        .post(function (req, res) {
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ProductName", sql.VarChar(50), req.body.ProductName)
                    request.input("ProductPrice", sql.Decimal(18, 0), req.body.ProductPrice)
                    request.execute("Usp_InsertProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send(err);
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send(err);
            });
        });


    router.route('/:id')
        .put(function (req, res) {
            var _productID = req.params.id;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ProductID", sql.Int, _productID)
                                        request.input("ProductName", sql.VarChar(50), req.body.ProductName)
                    request.input("ProductPrice", sql.Decimal(18, 0), req.body.ProductPrice)
                    request.execute("Usp_UpdateProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send(err);
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while updating data");
            });
        });


        router.route('/:id')
        .delete(function (req, res) {
            var _productID = req.params.id;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ProductID", sql.Int, _productID)
                    request.execute("Usp_DeleteProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).json("ProductID:" + _productID);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send(err);
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
            })
        });

        router.route('/login')
        .get(function (req, res) {
            conn.connect().then(function () {
                var sqlQuery = "SELECT * FROM login";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
        });

    return router;
};
module.exports = routes;