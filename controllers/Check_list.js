const moment = require('moment')
const fs = require('fs')
const md5 = require('md5')

//------------------------------------------------------------------------------------------------------------------------------------ เริ่ม เกี่ยวกับ USER

exports.addUser = (req, res, next) => {
    let { body, user } = req

    // console.log(body)
    // console.log(user)
    const date = moment().format('Y-M-D H:mm:ss')

    req.getConnection((error, connection) => {
        if (error) throw error;
        let sql = `INSERT INTO user 
        (usr_username, usr_password, usr_fullname, usr_cid, usr_tel, usr_dept, usr_type, usr_type_txt, usr_upby, usr_updt, usr_status)
        VALUES (
            '${body.username}',
            '${body.password}',
            '${body.fullname}',
            '${body.cid}',
            '${body.tel}',
            '${body.dept}',
            '${body.type}',
            '${body.type_text}',
            '${user.usr_username}',
            '${date}',
            '${body.status}'
        )`
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            connection.destroy();
            res.send({ 'status': 'success', 'result': results })
        });
    });
}

exports.editUserByCid = (req, res, next) => {
    let { body, user } = req
    // console.log(body)
    // console.log(user)
    const date = moment().format('Y-M-D H:mm:ss')
    req.getConnection((error, connection) => {
        if (error) throw error;
        let sql = `
        UPDATE user SET 
            usr_username = '${body.username}',
            usr_password = '${body.password}' , 
            usr_fullname = '${body.fullname}',
            usr_tel      = '${body.tel}',
            usr_dept     = '${body.dept}',
            usr_type     = '${body.type}',
            usr_type_txt = '${body.type_text}',
            usr_upby     = '${user.usr_username}' , 
            usr_updt     = '${date}' ,
            usr_status   = '${body.status}'
        WHERE usr_cid    = '${body.cid}'`
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            connection.destroy();
            res.send({ 'status': 'success', 'result': results })
        });
    });
}

exports.delUserById = (req, res, next) => {
    let { body } = req
    // console.log(body)
    req.getConnection((error, connection) => {
        if (error) throw error;
        let sql = `DELETE FROM user WHERE usr_id = '${body.id}'`
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            connection.destroy();
            res.send({ 'status': 'success', 'result': results })
        });
    });
}

exports.getUserAll = (req, res, next) => {

    req.getConnection((err, connection) => {
        if (err) return console.log(err)
        try {
            let sql = `
            SELECT 
                usr.*,
                d.name AS name_dept,
                levs.name_level
            FROM user usr 
            LEFT JOIN dept d ON d.id = usr.usr_dept
            LEFT JOIN level_status levs ON levs.number_level = usr.usr_status`;
            connection.query(sql, (err, row) => {
                if (err) return console.log(err)
                res.send(row)
            })
        } catch (error) {
            console.log(error)
        }
    })
}

exports.getUserByCId = (req, res, next) => {
    // console.log(req)
    req.getConnection((err, connection) => {
        if (err) return console.log(err)
        try {
            let sql = `SELECT * FROM user WHERE usr_cid = '${req.params.cid}'`;
            connection.query(sql, (err, row) => {
                if (err) return console.log(err)
                res.send(row)
            })
        } catch (error) {
            console.log(error)
        }
    })
}

exports.editPasswordByCID = (req, res, next) => {
    let { body } = req

    // console.log(body)
    const date = moment().format('Y-M-D H:mm:ss')
    req.getConnection((error, connection) => {
        if (error) throw error;
        let sql = `
        UPDATE user SET 
        usr_password = '${body.newPassword}' , 
        usr_upby     = '${body.username}' , 
        usr_updt     = '${date}' 
        WHERE usr_cid    = '${body.cid}'`
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            connection.destroy();
            res.send({ 'status': 'success', 'result': results })
        });
    });
}

exports.getDeptAll = (req, res, next) => {

    req.getConnection((err, connection) => {
        if (err) return console.log(err)
        try {
            let sql = `SELECT * FROM dept`;
            connection.query(sql, (err, row) => {
                if (err) return console.log(err)
                res.send(row)
            })
        } catch (error) {
            console.log(error)
        }
    })
}
exports.getTypeAll = (req, res, next) => {

    req.getConnection((err, connection) => {
        if (err) return console.log(err)
        try {
            let sql = `SELECT * FROM vision_type`;
            connection.query(sql, (err, row) => {
                if (err) return console.log(err)
                res.send(row)
            })
        } catch (error) {
            console.log(error)
        }
    })
}
exports.getStatusAll = (req, res, next) => {

    req.getConnection((err, connection) => {
        if (err) return console.log(err)
        try {
            let sql = `SELECT * FROM level_status`;
            connection.query(sql, (err, row) => {
                if (err) return console.log(err)
                res.send(row)
            })
        } catch (error) {
            console.log(error)
        }
    })
}