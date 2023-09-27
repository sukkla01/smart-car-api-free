const moment = require('moment')
require('moment/locale/th')
moment.locale("th");
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');
const request = require('request');

const db = makeDb();
db.connect(con);



exports.getReserveAll = async (req, res, next) => {
    const data = await db.query(con, `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
    location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
	a.approve_status
    FROM reserve_car_head h
    LEFT JOIN user u ON u.username = h.username
    LEFT JOIN dept d ON d.id = h.dept
    LEFT JOIN position p ON p.id = h.position  
		LEFT JOIN approve_admin_car a ON a.head_id = h.id
    ORDER BY h.d_update ASC `);
    res.send(data);
};
exports.getReserveAllWait = async (req, res, next) => {
    const data = await db.query(con, `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
    location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
	a.approve_status
    FROM reserve_car_head h
    LEFT JOIN user u ON u.username = h.username
    LEFT JOIN dept d ON d.id = h.dept
    LEFT JOIN position p ON p.id = h.position  
		LEFT JOIN approve_admin_car a ON a.head_id = h.id
    WHERE approve_status  IS null 
    ORDER BY h.d_update ASC  `);
    res.send(data);
};
exports.getReserveAllApprove = async (req, res, next) => {
    let status = req.params.status
    let sql = ''
    if (status == 'waitapprove') {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
        a.approve_status
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
            LEFT JOIN approve_admin_car a ON a.head_id = h.id
        WHERE approve_status  IS null  AND boss_dept is NOT NULL
        ORDER BY start_date ASC   `

    } else if (status == 'approve') {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
        a.approve_status
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
            LEFT JOIN approve_admin_car a ON a.head_id = h.id
        WHERE approve_status  IN('Y') AND boss_dept is NOT NULL
        ORDER BY a.approve_status,h.d_update ASC  `
    } else {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
        a.approve_status
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
            LEFT JOIN approve_admin_car a ON a.head_id = h.id
        where  boss_dept is NOT NULL
        ORDER BY a.approve_status,h.d_update ASC  `
    }


    const data = await db.query(con, sql);
    res.send(data);
};


exports.getReserveUser = async (req, res, next) => {
    let dept_tmp = req.params.dept
    let dept_arr = dept_tmp.split(',')
    let dept = dept_arr.toString()

    let username = req.params.username


    const data = await db.query(con, `SELECT h.*,m.type_car ,a.approve_status
    FROM reserve_car_head  h
    LEFT JOIN approve_admin_car a ON a.head_id = h.id
    LEFT JOIN reserve_car_manage m ON m.no = a.car_id
    WHERE ( h.dept IN(${dept})  OR username = '${username}' )  `);
    res.send(data);
};
exports.getReserveCar = async (req, res, next) => {
    let id = req.params.id
    const data = await db.query(con, `SELECT h.*,
    DATE_FORMAT(h.start_date, "%Y-%m-%d") AS start_date_c,
    DATE_FORMAT(h.end_date, "%Y-%m-%d") AS enddate_date_c 
    FROM reserve_car_head h WHERE id =    '${id}' `);
    res.send(data);
};


exports.getTname = async (req, res, next) => {
    const data = await db.query(con, `SELECT username,tname FROM user  `);
    res.send(data);
};

exports.getDetp = async (req, res, next) => {
    const data = await db.query(con, `SELECT * FROM dept `);
    res.send(data);
};
exports.getPosition = async (req, res, next) => {

    const data = await db.query(con, `SELECT * FROM position ORDER BY name DESC  `);
    res.send(data);
};


exports.create = async (req, res, next) => {
    let { body } = req
    console.log(body)
    var post = {
        id: body.id,
        username: body.username,
        dept: body.dept,
        position: body.position,
        location: body.location,
        detail: body.detail,
        start_date: moment(body.start_date).format('YYYY-MM-DD'),
        start_time: body.start_time,
        end_date: moment(body.end_date).format('YYYY-MM-DD'),
        end_time: body.end_time,
        tcount: body.tcount,
        staff: body.staff,
        d_update: moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
    }

    const data = await db.query(con, `REPLACE into reserve_car_head set ? `, [post]);
    LineNotify(body.dept, moment(body.start_date).format('LL'), moment(body.end_date).format('LL'))
    LineNotifyBossDept(body.dept)
    res.send(data);


}


const LineNotifyBossDept = async (dept_id) => {
    const data_token = await db.query(con, `SELECT token_line FROM  user WHERE dept = '${dept_id}' AND role = 'boss_dept' AND token_line is NOT null `);

    data_token.map((item, i) => {
        try {
            request({
                method: 'POST',
                uri: "https://notify-api.line.me/api/notify",
                header: {
                    'Content-Type': 'multipart/form-data',
                },
                auth: {
                    bearer: item.token_line,
                },
                form: {
                    message: `มีรายการรออนุมัติใหม่ \nhttps://smart-car.diligentsoftinter.com/boss-dept`
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
    })


}

const LineNotify = async (dept_id, start_date, end_date) => {
    const data = await db.query(con, `SELECT * FROM dept WHERE id ='${dept_id}' `);

    let dept_name = data[0].name

    try {
        request({
            method: 'POST',
            uri: "https://notify-api.line.me/api/notify",
            header: {
                'Content-Type': 'multipart/form-data',
            },
            auth: {
                bearer: config.line_token,
            },
            form: {
                message: `แผนก${dept_name} ขอใช้รถ\n วันที่ ${start_date} \n ถึงวันที่ ${end_date}`
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

exports.del = async (req, res, next) => {
    let { body } = req
    const data = await db.query(con, `delete  from  reserve_car_head   where id = '${body.id}' `);
    res.send(data);
};

exports.getReport1 = async (req, res, next) => {
    let id = req.params.id
    const data = await db.query(con, `SELECT u1.tname AS staff_reserve, u2.tname AS  boss_dept_name,
    u3.tname AS admin_approve_name,u4.tname AS boss_admin_name,
    p.name AS position_name,d.name AS dept_name,location,
    h.detail,h.tcount,h.start_date,h.start_time,h.end_date,h.end_time,
    m.no_car,cm.type_car,k.name AS keeper_name
    FROM reserve_car_head h
    LEFT JOIN user u1 ON u1.username = h.username
    LEFT JOIN user u2 ON u2.username = h.boss_dept
    LEFT JOIN user u3 ON u3.username = h.admin_approve
    LEFT JOIN user u4 ON u4.username = h.boss_admin
    LEFT JOIN dept d ON d.id = h.dept
    LEFT JOIN position p ON p.id = h.position
    LEFT JOIN approve_admin_car m ON m.head_id = h.id
    LEFT JOIN keeper k ON k.id = m.keeper
    LEFT JOIN reserve_car_manage cm ON cm.no = m.car_id
    WHERE h.id = '${id}'   `);
    res.send(data);
}

exports.getReserveAllFilter = async (req, res, next) => {
    let sql = ''
    let { body } = req
    let sql_date = body.tdate == null || body.tdate == '' ? '' : ` AND h.start_date = '${body.tdate}'`

    console.log(body)
    if (body.status == 'waitapprove') {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
        a.approve_status
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
            LEFT JOIN approve_admin_car a ON a.head_id = h.id
        WHERE approve_status  IS null  AND boss_dept is NOT NULL
        ${sql_date}
        ORDER BY start_date ASC   `

    } else if (body.status == 'approve') {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
        a.approve_status
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
        LEFT JOIN approve_admin_car a ON a.head_id = h.id
        WHERE approve_status  IN('Y','N') AND boss_dept is NOT NULL
        ${sql_date}
        ORDER BY a.approve_status,h.d_update ASC  `
    } else {
        sql = `SELECT h.id,u.tname,d.name as dept_name,p.name AS postion_name,
        location,h.detail,h.start_date,h.start_time,h.end_date,h.end_time,h.tcount,admin_approve,
        a.approve_status
        FROM reserve_car_head h
        LEFT JOIN user u ON u.username = h.username
        LEFT JOIN dept d ON d.id = h.dept
        LEFT JOIN position p ON p.id = h.position  
        LEFT JOIN approve_admin_car a ON a.head_id = h.id
        where  boss_dept is NOT NULL
        ${sql_date}
        ORDER BY a.approve_status,h.d_update ASC  `
    }


    const data = await db.query(con, sql);
    res.send(data);
};


exports.getReport2 = async (req, res, next) => {
    let date1 = req.params.date1
    const data = await db.query(con, `SELECT u.tname , d.name AS dept_name,location,
    CONCAT( a.start_time) AS start_date,CONCAT( a.end_time ) AS end_date,
		h.detail,h.tcount,k.name AS keeper_name
    FROM reserve_car_head  h
    LEFT JOIN user u ON u.username = h.username
    LEFT JOIN approve_admin_car a ON a.head_id = h.id
    LEFT JOIN dept d ON d.id = h.dept
    LEFT JOIN keeper k ON k.id = h.keeper
    WHERE a.start_date = '${date1}'  
    AND approve_status = 'Y' `);
    res.send(data);
}



exports.getReserveWaitBossDept = async (req, res, next) => {
    const data = await db.query(con, `	SELECT h.*,m.type_car ,a.approve_status,d.name AS dept_name,u.tname
    FROM reserve_car_head  h
    LEFT JOIN approve_admin_car a ON a.head_id = h.id
    LEFT JOIN reserve_car_manage m ON m.no = a.car_id
		LEFT JOIN dept d ON d.id = h.dept
		LEFT JOIN user u ON u.username = h.username
    WHERE boss_dept IS NULL   `);
    res.send(data);
};
