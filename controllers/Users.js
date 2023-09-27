const jwt = require('jwt-simple')
const config = require('../config')
//var time = require('time');

const moment = require('moment')
const mysql = require("mysql");
const con = mysql.createConnection(config.dbOption);
const { makeDb } = require('mysql-async-simple');
const md5 = require('md5')
const request = require('request');
const db = makeDb();
db.connect(con);

function tokenForUser(user) {
    // console.log(user)
    const timestamp = new Date().getTime()
    return jwt.encode({
        username: user.username,
        password: user.password,
        fullname: user.tname,
        cid: user.cid,
        dept: user.dept,
        role: user.role
        // type: user.usr_type,
        // status: user.usr_status,
        // posittion: user.usr_position,
    },
        config.secret
    )
}

exports.signin = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) })
}


exports.getUserAll = async (req, res, next) => {
    const data = await db.query(con, `SELECT *
    FROM user u
    LEFT JOIN dept d ON d.id = u.dept `);
    res.send(data);
};

exports.create = async (req, res, next) => {
    let { body } = req;
    const date = moment().format("Y-M-D H:mm:ss");
    let passwordhint = md5(body.password);
    let private = 0;

    console.log(body.dept)

    if (body.status == 99) {
        private = 1;
    }

    let post = {
        username: body.username,
        password: body.password,
        pass_md5: md5(body.password),
        cid: body.cid,
        tname: body.tname,
        dept: body.dept.toString(),
        role: body.role,
        status: body.status,
        d_update: moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
    };


    const data = await db.query(con, `REPLACE into user set ? `, [post]);
    res.send(data);
};


exports.getUserId = async (req, res, next) => {
    let username = req.params.username
    const data = await db.query(con, `SELECT *  FROM user  where username = '${username}'  `);
    res.send(data);
};


exports.del = async (req, res, next) => {
    let { body } = req;
    const data = await db.query(con, `Delete FROM user  where username = '${body.username}'  `);
    res.send(data);
};


exports.creatLineToken = async (req, res, next) => {
    let { body } = req;
    const data = await db.query(con, `Update  user set token_line = '${body.line_token}'  where username = '${body.username}'  `);
    res.send(data);
};


exports.getUserId = async (req, res, next) => {
    let username = req.params.username
    const data = await db.query(con, `SELECT *  FROM user  where username = '${username}'  `);
    res.send(data);
};


exports.LineTest = async (req, res, next) => {

    let { body } = req;

    const data_token = await db.query(con, `SELECT token_line 
    FROM  user  
    WHERE username = '${body.username}' `,);


    if((data_token[0].token_line != null || data_token[0].token_line != '') ){
        
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
                    message: ` ทดสอบระบบแจ้งเตือน smart car `
                },
            }, (err, httpResponse, body) => {
                if (err) {
                    console.log(err)
                    console.log('----')
                    res.send({ 'status' : 'error'});
                } else {
                    console.log(body)
                    res.send({ 'status' : body });
                }
            });
    
        } catch (error) {
            res.send({ 'status' : 'error'});
        }
    }


    

}




