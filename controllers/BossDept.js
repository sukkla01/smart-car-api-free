const moment = require('moment')
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');

const db = makeDb();
db.connect(con);

exports.getReserveAllBoss = async (req, res, next) => {
    let status = req.params.status
    let dept_tmp = req.params.dept
    let dept_arr = dept_tmp.split(',')
    let dept = dept_arr.toString()

    // let dept = dept_tmp.toString()
    console.log(dept)
    let sql = ''
    if (status == 'waitapprove') {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
        a.approve_status,boss_dept
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
            LEFT JOIN approve_admin_car a ON a.head_id = h.id
        WHERE h.dept IN(${dept})    AND boss_dept  IS null 
        ORDER BY boss_dept_date,h.d_update ASC   `

    } else if (status == 'approve') {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
        a.approve_status,boss_dept
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
            LEFT JOIN approve_admin_car a ON a.head_id = h.id
        WHERE h.dept IN(${dept}) AND boss_dept  is not null
        ORDER BY boss_dept_date,h.d_update ASC  `
    } else {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
        a.approve_status,boss_dept
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
            LEFT JOIN approve_admin_car a ON a.head_id = h.id
        where h.dept IN(${dept})   
        ORDER BY boss_dept_date,h.d_update ASC  `
    }


    const data = await db.query(con, sql);
    res.send(data);
};

exports.createApprove = async (req, res, next) => {
    let { body } = req
    let d_update = moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
    try {
        const data_update = await db.query(con, `UPDATE reserve_car_head SET boss_dept='${body.staff}',boss_dept_date ='${d_update}' WHERE  id ='${body.head_id}'`,);
        res.send(data_update);

    } catch (error) {
        console.log(error)
    }

}
