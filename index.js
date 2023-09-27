const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const myConnection = require('express-myconnection')
const http = require('http')
const errorHandler = require('./middleware/errorHandler')
const socketIO = require('socket.io')
const config = require('./config')
const routes = require('./routes')


const PORT = 4090


// our server instance
const server = http.createServer(app)
const io = require('socket.io')(server)
// This creates our socket using the instance of the server

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: '*/*' }))

app.use(myConnection(mysql, config.dbOption, 'pool'))
routes(app)


// socket io
io.on('connection', function (client) {
    console.log('Connected...', client.id);


    // user บันทึกการจองรถ
    client.on('user-reserve', function name(data) {
        console.log(data);
        console.log('user-add-reserve');
        io.emit('user-add-reserve', data);
    })

    // หัวหน้าแผนกอนมุติ
    client.on('boss-dept-approve', function name(data) {
        // console.log(data);
        console.log('boss-dept-approve');
        io.emit('boss-dept-add-approve');
    })

    //admin อนุมัติ
    client.on('admin-approve', function name(data) {
        console.log(data);

        console.log('add-approve-admin---');
        io.emit('add-approve-admin');
    })


    // หัวหน้า admin ระบบจัดรถ
    client.on('boss-admin-approve', function name(data) {
        console.log(data);

        console.log('add-approve-admin---');
        io.emit('add-approve-boss-admin',data);
    })







    //listens when a user is disconnected from the server
    client.on('disconnect', function () {
        console.log('Disconnected...', client.id);
    })

    //listens when there's an error detected and logs the error on the console
    client.on('error', function (err) {
        console.log('Error detected', client.id);
        console.log(err);
    })
})
// end socket io

app.use(express.static('image'));
app.use(express.static('files'));
app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`start port : ${PORT}`)
})