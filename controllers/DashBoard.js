

const moment = require('moment')
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');
const fs = require('fs');

const db = makeDb();
db.connect(con);


exports.getDash1 = async (req, res, next) => {
    let id = req.params.id

    const data = await db.query(con, `SELECT  count(id) AS total,
    sum(IF(boss_dept is NULL,1,0)) as sumBossDept,
    sum(IF(admin_approve is NULL AND boss_dept IS NOT NULL,1,0)) as sumAdminApprove,
    sum(IF(boss_admin is NULL AND  boss_dept IS NOT NULL AND admin_approve is NOT NULL,1,0)) as sumBossAdmin
    FROM reserve_car_head  `);
    res.send(data);
};
exports.getDash2 = async (req, res, next) => {
    let id = req.params.id

    const data = await db.query(con, `SELECT h.dept,d.name as dept_name,count(h.id) AS tcount
    FROM reserve_car_head h
    LEFT JOIN dept d ON d.id = h.dept
    GROUP BY dept
    ORDER BY tcount DESC limit 10
      `);
    res.send(data);
};
exports.getChart1Month = async (req, res, next) => {

    const data = await db.query(con, `SELECT YEAR(d_update) AS tyear,  MONTH(d_update) AS tmonth,count(h.id) AS tcount,
    CASE 
        WHEN MONTH(d_update) = 1 THEN "ม.ค."
        WHEN MONTH(d_update) = 2 THEN "ก.พ."
        WHEN MONTH(d_update) = 3 THEN "มี.ค."
        WHEN MONTH(d_update) = 4 THEN "เม.ย."
        WHEN MONTH(d_update) = 5 THEN "พ.ค."
        WHEN MONTH(d_update) = 6 THEN "มิ.ย."
        WHEN MONTH(d_update) = 7 THEN "ก.ค."
        WHEN MONTH(d_update) = 8 THEN "ส.ค."
        WHEN MONTH(d_update) = 9 THEN "ก.ย."		
        WHEN MONTH(d_update) = 10 THEN "ต.ค.."
        WHEN MONTH(d_update) = 11 THEN "พ.ย."
        ELSE "ธ.ค." 
    END AS month_name
    FROM reserve_car_head h
    LEFT JOIN dept d ON d.id = h.dept
    GROUP BY  YEAR(d_update), MONTH(d_update)
    ORDER BY tyear,tmonth DESC`);
    res.send(data);
};
exports.getChart1Year = async (req, res, next) => {

    const data = await db.query(con, `SELECT YEAR(d_update) +543 AS tyear,count(h.id) AS tcount
    FROM reserve_car_head h
    LEFT JOIN dept d ON d.id = h.dept
    GROUP BY  YEAR(d_update)
    ORDER BY tyear `);
    res.send(data);
};