

const passport = require('passport')
const passportService = require('./service/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const users = require('./controllers/Users')




//-------------- jub ---------
// const Toilet = require('./controllers/Toilet')
const Reserve = require('./controllers/Reserve')
const Dept = require('./controllers/Dept')
const ManageCar = require('./controllers/ManageCar')
const Keeper = require('./controllers/Keeper')
const Approve = require('./controllers/Approve')
const BossDept = require('./controllers/BossDept')
const BossAdmin = require('./controllers/BossAdmin')
const Role = require('./controllers/Role')
const DashBoard = require('./controllers/DashBoard')
const AdminCar = require('./controllers/AdminCar')
const Test = require('./controllers/Test')

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send("<h1 style='text-align:center;margin-top:150px; '>Smart Car API</h1>")
    })
    app.post('/signin', requireSignin, users.signin)

    //-------------------------------------backend Konthorn Thonsap----------------------------------

    // เกี่ยวกับ User
    app.get('/get-user-all', requireAuth, users.getUserAll)
    // app.get('/get-user-by-cid/:cid', requireAuth, CheckList.getUserByCId)

    // app.post('/add-user', requireAuth, CheckList.addUser)
    // app.post('/edit-user-by-cid', requireAuth, CheckList.editUserByCid)
    // app.post('/edit-password-by-cid', requireAuth, CheckList.editPasswordByCID)
    // app.post('/del-user-by-id', requireAuth, CheckList.delUserById)

    // app.get('/get-dept-all', requireAuth, CheckList.getDeptAll)
    // app.get('/get-type-all', requireAuth, CheckList.getTypeAll)
    // app.get('/get-status-all', requireAuth, CheckList.getStatusAll)

    // app.get('/get-order-toilet-all', requireAuth, Toilet.getOrderToiletAll)
    //-------------------------------------backend Konthorn Thonsap----------------------------------



    app.post('/add-reserve-car', requireAuth, Reserve.create)
    app.post('/del-reserve-car', requireAuth, Reserve.del)
    app.get('/get-reserve-car-user/:dept/:username', requireAuth, Reserve.getReserveUser)
    app.get('/edit-reserve-car/:id', requireAuth, Reserve.getReserveCar)
    app.get('/get-reserve-all', requireAuth, Reserve.getReserveAll)
    app.get('/get-reserve-approve/:status', requireAuth, Reserve.getReserveAllApprove)
    app.get('/get-reserve-wait-approve', requireAuth, Reserve.getReserveAllWait)
    app.post('/get-reserve-filter', requireAuth, Reserve.getReserveAllFilter)

    app.get('/get-dept', requireAuth, Reserve.getDetp)
    app.get('/get-position', requireAuth, Reserve.getPosition)


    //dept
    app.get('/get-dept-all', requireAuth, Dept.getDeptAll)
    app.post('/add-dept', requireAuth, Dept.create)
    app.post('/delete-dept', requireAuth, Dept.delete)
    app.get('/get-dept-id/:id', requireAuth, Dept.getDeptId)

    //users
    app.post('/add-user', requireAuth, users.create)
    app.get('/get-user-id/:username', requireAuth, users.getUserId)
    app.post('/delete-user', requireAuth, users.del)
    app.post('/add-line-token-user', requireAuth, users.creatLineToken)
    app.post('/user-line-token-test', requireAuth, users.LineTest)

    //magage car
    app.post('/add-manage-car', requireAuth, ManageCar.create)
    app.get('/get-car-all', requireAuth, ManageCar.getCarAll)
    app.post('/delete-car', requireAuth, ManageCar.del)

    //คนขับ
    app.get('/get-keeper-all', requireAuth, Keeper.getKeeperAll)


    //อนุมัติ Admin
    app.post('/add-approve-admin', requireAuth, Approve.create)
    app.post('/add-notapprove-admin', requireAuth, Approve.createNotApprove)
    app.get('/get-approve/:id', requireAuth, Approve.getApprove)
    app.get('/get-approve-detail/:id', requireAuth, Approve.getApproveDetail)
    app.get('/get-not-approve', requireAuth, AdminCar.getNotApprove)
    app.get('/get-wait-approve-bossdept', requireAuth, Reserve.getReserveWaitBossDept)


    //อนุมัติหัวหน้าแผนก
    app.get('/get-approve-boss-dept/:status/:dept', requireAuth, BossDept.getReserveAllBoss)
    app.post('/add-approve-boss-dept', requireAuth, BossDept.createApprove)


    //อนุมัติหัวหน้า admin
    app.get('/get-approve-boss-admin/:status', requireAuth, BossAdmin.getReserveAllApprove)
    app.post('/add-approve-boss-admin', requireAuth, BossAdmin.createApprove)
    app.post('/add-not-approve-boss-admin', requireAuth, BossAdmin.createNotApprove)


    //อนุมัติหัวหน้า admin
    app.get('/get-role', requireAuth, Role.getRole)


    //หน้าหลัก
    app.get('/get-dash1', requireAuth, DashBoard.getDash1)
    app.get('/get-dash2', requireAuth, DashBoard.getDash2)
    app.get('/get-chart1', requireAuth, DashBoard.getChart1Month)
    app.get('/get-chart2', requireAuth, DashBoard.getChart1Year)

    //pdf
    app.get('/get-report-reserve/:id', requireAuth,Reserve.getReport1 )
    app.get('/get-reserve-report2/:date1', requireAuth,Reserve.getReport2 )



    //Test

    app.get('/get-test1', Test.test1 )

    //dd







}