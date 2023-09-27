const moment = require('moment')
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');
const request = require('request');

const db = makeDb();
db.connect(con);

exports.getReserveAllApprove = async (req, res, next) => {
    let status = req.params.status
    let sql = ''
    if (status == 'waitapprove') {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,a.start_date,a.start_time,a.end_date,a.end_time,a.tcount,admin_approve,
        a.approve_status,boss_admin,h.dept,boss_admin_detail
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
        LEFT JOIN approve_admin_car a ON a.head_id = h.id
        WHERE  approve_status  IN('Y','N') AND boss_admin is  NULL
        ORDER BY boss_admin_date,h.d_update ASC   `

    } else if (status == 'approve') {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,a.start_date,a.start_time,a.end_date,a.end_time,a.tcount,admin_approve,
        a.approve_status,boss_admin,h.dept,boss_admin_detail
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
        LEFT JOIN approve_admin_car a ON a.head_id = h.id
        WHERE approve_status  IN('Y') AND boss_admin is not NULL
        ORDER BY boss_admin_date,h.d_update ASC  `
    } else {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,a.start_date,a.start_time,a.end_date,a.end_time,a.tcount,admin_approve,
        a.approve_status,boss_admin,h.dept,boss_admin_detail
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
        LEFT JOIN approve_admin_car a ON a.head_id = h.id
        where  approve_status  IN('Y','N')
        ORDER BY boss_admin_date,h.d_update ASC  `
    }


    const data = await db.query(con, sql);
    res.send(data);
};

exports.createApprove = async (req, res, next) => {
    let { body } = req
    let d_update = moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
    try {
        const data_update = await db.query(con, `UPDATE reserve_car_head SET boss_admin='${body.staff}',boss_admin_date ='${d_update}' WHERE  id ='${body.head_id}'`);
        res.send(data_update);

    } catch (error) {
        console.log(error)
    }

    const data_token = await db.query(con, `SELECT token_line 
    FROM reserve_car_head h
    LEFT JOIN user u ON u.username = h.username 
    WHERE h.id = '${body.head_id}' `);


    const data_send = await db.query(con, `SELECT h.location,a.start_date,a.start_time,a.end_date,a.end_time,a.tcount,
    type_car,m.no_car,k.name AS keeper_name,h.detail
    FROM reserve_car_head h
    LEFT JOIN user u ON u.username = h.username 
    LEFT JOIN approve_admin_car a ON a.head_id = h.id
    LEFT JOIN reserve_car_manage m ON m.no   = a.car_id
    LEFT JOIN keeper k ON k.id = a.keeper
    WHERE h.id = '${body.head_id} '  `);

    if ((data_token[0].token_line != null || data_token[0].token_line != '') && data_send.length > 0) {
        let d = data_send[0]
        try {
            request({
                method: 'POST',
                uri: "https://notify-api.line.me/api/notify",
                header: {
                    'Content-Type': 'multipart/form-data',
                },
                auth: {
                    // bearer: 'IKkZApKR1VORzCGshGzEonB3YHRQif7Vy0IFm8BBrqU',
                    bearer: data_token[0].token_line,
                },
                form: {
                    message: ` อนุมัติแล้ว\n------------( smart car )-------------------- \nสถานที่ :  ${d.location} \nวันเวลาเดินทาง : ${moment(d.start_date).format('DD/MM/YYYY') + ' ' + d.start_time.substring(0, 5)}\nวันเวลากลับ :  ${moment(d.end_date).format('DD/MM/YYYY') + ' ' + d.end_time.substring(0, 5)}\n -------------------------------- \nประเภทรถ :  ${d.type_car} \nเลขทะเบียนรถ : ${d.no_car}\nคนขับ : ${d.keeper_name} \n-------------------------------- \nจำนวนคนไป :  ${d.tcount}\nรายละเอียด : ${d.detail} `
                },
            }, (err, httpResponse, body) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(body)
                }
            });

        } catch (error) {
            console.log(error)
        }
    }


}

exports.createNotApprove = async (req, res, next) => {
    let { body } = req
    let d_update = moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
    try {
        const data_update = await db.query(con, `UPDATE reserve_car_head SET boss_admin='${body.staff}',boss_admin_date ='${d_update}',boss_admin_detail = '${body.comment}' WHERE  id ='${body.head_id}'`);
        const data_update_2 = await db.query(con, `UPDATE approve_admin_car SET approve_status='N',comment = '${body.comment}' WHERE  head_id ='${body.head_id}'`);
        res.send(data_update_2);

    } catch (error) {
        console.log(error)
    }

}
