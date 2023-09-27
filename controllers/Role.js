const moment = require('moment')
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');
const fs = require('fs');

const db = makeDb();
db.connect(con);


exports.getRole = async (req, res, next) => {
    let id = req.params.id

    const data = await db.query(con, `SELECT * FROM role   `);
    res.send(data);
};