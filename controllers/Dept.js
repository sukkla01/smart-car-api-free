const moment = require("moment");
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');

const db = makeDb();
db.connect(con);


exports.getDeptAll = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return console.log(err);
    try {
      let sql = `SELECT * from dept`;
      connection.query("SET NAMES UTF8");
      connection.query(sql, (err, row) => {
        if (err) return console.log(err);
        res.send(row);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

exports.getDeptId = (req, res, next) => {
  let id = req.params.id
  req.getConnection((err, connection) => {
    if (err) return console.log(err);
    try {
      let sql = `SELECT * from dept where id='${id}' `;
      connection.query("SET NAMES UTF8");
      connection.query(sql, (err, row) => {
        if (err) return console.log(err);
        res.send(row);
      });
    } catch (error) {
      console.log(error);
    }
  });
};



exports.create = (req, res, next) => {
  let { body } = req;


  let data = {
    id: body.id,
    name: body.name,
  };

  console.log(data)
  req.getConnection((error, connection) => {
    if (error) throw error;
    connection.query(`REPLACE INTO dept set ?`, data, function (error, results) {
      if (error) return console.log(error);
      connection.destroy();
      // console.log(results)
      res.send({ status: "success", result: results });
    }
    );
  });
};


exports.delete = (req, res, next) => {
  let { body } = req;

 
  req.getConnection((error, connection) => {
      if (error) throw error;
      connection.query(`DELETE FROm  dept where id='${body.id}'   `, function (error, results) {
          if (error) return console.log(error);
          connection.destroy();
          // console.log(results)
          res.send({ status: "success", result: results });
      }
      );
  });
};