const moment = require('moment')
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');

const db = makeDb();
db.connect(con);



exports.getKeeperAll = async (req, res, next) => {
    const data = await db.query(con, `SELECT * FROM keeper `);
    res.send(data);
};
