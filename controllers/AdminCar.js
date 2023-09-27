const moment = require('moment')
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');
const fs = require('fs');

const db = makeDb();
db.connect(con);



exports.getNotApprove = async (req, res, next) => {
    const data = await db.query(con, `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
    location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
    a.approve_status
    FROM reserve_car_head h
    LEFT JOIN user u ON u.username = h.username
    LEFT JOIN dept d ON d.id = h.dept
    LEFT JOIN position p ON p.id = h.position  
    LEFT JOIN approve_admin_car a ON a.head_id = h.id
    WHERE a.approve_status ='N'
    ORDER BY start_date ASC    `);
    res.send(data);
};