const moment = require('moment')
const mysql = require("mysql");
const config = require("../config");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');

const db = makeDb();
db.connect(con);


exports.getHistory = async (req, res, next) => {
    let location = req.params.location
    console.log(location)
    const data = await db.query(con, `SELECT CONCAT(DATE_FORMAT(ins_dt,'%d/%m/'),DATE_FORMAT(ins_dt,'%Y') +543)  as tdate,
    sum(if(work = 'AM','1','0')) AS 'Tam',
    sum(if(work = 'PM','1','0')) AS 'Tpm',
    ins_by
    FROM checklist_toilet 
    WHERE location = '${location}'
    GROUP BY  tdate  `);
    res.send(data);
};
exports.getHistoryStaff = async (req, res, next) => {
    let staff = req.params.staff
    const data = await db.query(con, `SELECT CONCAT(DATE_FORMAT(ins_dt,'%d/%m/'),DATE_FORMAT(ins_dt,'%Y') +543)  as tdate,
    sum(if(work = 'AM','1','0')) AS 'Tam',
    sum(if(work = 'PM','1','0')) AS 'Tpm',
    ins_by
    FROM checklist_toilet 
    WHERE ins_by = '${staff}'
    GROUP BY  tdate  `);
    res.send(data);
};
//pull


exports.addToilet = async (req, res, next) => {
    let { body } = req
    // console.log(body)
    const d_update = moment().format('Y-M-D H:mm:ss')
    try {
        let sql = `INSERT INTO checklist_toilet 
        (work,bathfloor,ceilingwall,basin,counter,mirror,flushtoilet,urinal,tissuepaper,tap,rubbishbin,ins_by,ins_dt,ins_note,status,location) 
        VALUES (
            '${body.space}',
            ${body.dt.bathfloor},
            ${body.dt.ceilingwall},
            ${body.dt.basin},
            ${body.dt.counter},
            ${body.dt.mirror},
            ${body.dt.flushtoilet},
            ${body.dt.urinal},
            ${body.dt.tissuepaper},
            ${body.dt.tap},
            ${body.dt.rubbishbin},
            '${body.staff}',
            '${d_update}',
            '${body.detail}',
            '1',
            '${body.location}')`
        // console.log(sql)
        await db.query(con, sql);
    } catch (error) {
        console.log(error)
    }

    res.send({ status: "success" });
};


//---------------------------------------------------------- API KONTHORN THONSAP START ----------------------------------------//
exports.getOrderToiletAll = async (req, res, next) => {
    const data = await db.query(con, `
    SELECT 
        ct.*,
        usrIns.usr_fullname AS name_ins ,
        usrUp.usr_fullname AS name_up ,
        usrM.usr_fullname AS name_m 
    FROM checklist_toilet ct
    LEFT JOIN user usrIns ON usrIns.usr_username = ct.ins_by
    LEFT JOIN user usrUp ON usrUp.usr_username = ct.up_by
    LEFT JOIN user usrM ON usrM.usr_username = ct.m_upby
    ORDER BY status , ins_dt DESC`
    );
    res.send(data);
};

//---------------------------------------------------------- API KONTHORN THONSAP STOP -----------------------------------------//