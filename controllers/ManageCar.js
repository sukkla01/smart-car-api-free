const moment = require('moment')
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');
const fs = require('fs');

const db = makeDb();
db.connect(con);

exports.create = async (req, res, next) => {
    let { body } = req

    var imgPath = []
    console.log(body.image)
    if (body.image.length != 0) {
        body.image.map((item, i) => {
            let r = 'e_' + Math.random().toString(20).substr(2, 15);
            let comma_ = i == 0 ? '' : ','
            imgPath = imgPath + comma_ + r + '.png'
            // imgPath = JSON.stringify(imgPath)
            let base64Image = item.split(';base64,').pop();
            fs.writeFile(`image/${r}.png`, base64Image, { encoding: 'base64' }, function (err) {
                // console.log('File created');
            });
        })
    }

    let comma_ = body.imageEdit == '' ? '' : imgPath.length == 0 ? '' : ','
    try {
        var post = {
            no: body.formData.no,
            no_car: body.formData.no_car,
            type_car: body.formData.type_car,
            keeper: body.formData.keeper,
            image_car: body.imageEdit + comma_ + imgPath,
            status: body.formData.status ? 'Y' : 'N',
            count_seat: body.formData.count_seat,
        }

        const data = await db.query(con, `REPLACE into reserve_car_manage set ? `, [post]);
        res.send(data);

    } catch (error) {
        console.log(error)
    }

}

exports.getCarAll = async (req, res, next) => {
    const data = await db.query(con, `SELECT m.* ,k.name AS keeper_name
    FROM reserve_car_manage  m
    LEFT JOIN  keeper k ON k.id = m.keeper `);
    res.send(data);
};


exports.del = async (req, res, next) => {
    let { body } = req
    const data = await db.query(con, `delete  from  reserve_car_manage   where no = '${body.no}' `);
    res.send(data);
};