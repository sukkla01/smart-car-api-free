const moment = require('moment')
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');
const fs = require('fs');
const request = require('request');

const db = makeDb();
db.connect(con);

exports.create = async (req, res, next) => {
    let { body } = req
    let d_update = moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
    try {
        var post = {
            id: body.id,
            head_id: body.head_id,
            car_id: body.car_id,
            no_car: body.no_car,
            keeper: body.keeper,
            tcount: body.tcount,
            start_date: moment(body.start_date).format('YYYY-MM-DD'),
            start_time: body.start_time,
            end_date: moment(body.end_date).format('YYYY-MM-DD'),
            end_time: body.end_time,
            approve_status: body.approve_status,
            comment: body.comment,
        }

        console.log(post)

        const data = await db.query(con, `REPLACE into approve_admin_car set ? `, [post]);
        const data_update = await db.query(con, `UPDATE reserve_car_head SET admin_approve='${body.staff}',admin_approve_date ='${d_update}',no_car = '${body.no_car}',keeper = '${body.keeper}' WHERE  id ='${body.head_id}'`,);
        res.send(data);


        //----------------  line notify boss admin -----------------------
        const data_token = await db.query(con, `SELECT token_line FROM user WHERE role = 'boss_admin'  AND token_line  IS NOT NULL `);

        data_token.map((item, i) => {
            try {
                request({
                    method: 'POST',
                    uri: "https://notify-api.line.me/api/notify",
                    header: {
                        'Content-Type': 'multipart/form-data',
                    },
                    auth: {
                        // bearer: 'IKkZApKR1VORzCGshGzEonB3YHRQif7Vy0IFm8BBrqU',
                        bearer: item.token_line,
                    },
                    form: {
                        message: `มีรายการรออนุมัติใหม่ \nhttps://smart-car.diligentsoftinter.com/boss-admin`
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


        //----------------  line notify boss admin -----------------------

    } catch (error) {
        console.log(error)
    }

}

exports.createNotApprove = async (req, res, next) => {
    let { body } = req
    let d_update = moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
    try {
        var post = {
            id: body.id,
            head_id: body.head_id,
            approve_status: body.approve_status,
            comment: body.comment,
        }

        console.log(post)

        const data = await db.query(con, `REPLACE into approve_admin_car set ? `, [post]);
        const data_update = await db.query(con, `UPDATE reserve_car_head SET admin_approve='${body.staff}',admin_approve_date ='${d_update}' WHERE  id ='${body.head_id}'`,);
        res.send(data);

    } catch (error) {
        console.log(error)
    }

}


exports.getApprove = async (req, res, next) => {
    let id = req.params.id

    const data = await db.query(con, `SELECT *
    FROM approve_admin_car
    WHERE head_id= '${id}'    `);
    res.send(data);
};
exports.getApproveDetail = async (req, res, next) => {
    let id = req.params.id
    const data = await db.query(con, `	SELECT a.*,m.type_car,m.image_car,h.location,h.detail,k.name as keeper_name,
    h.boss_dept_date,h.boss_admin_date,h.admin_approve_date
    FROM reserve_car_head  h
    LEFT JOIN approve_admin_car a ON a.head_id = h.id
    LEFT JOIN reserve_car_manage m ON m.no = a.car_id
    LEFT JOIN keeper k ON k.id = a.keeper
    WHERE h.id = '${id}'    `);
    res.send(data);
};
