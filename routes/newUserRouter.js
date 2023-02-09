const router = require('express').Router();
const requiredAuthProcess= require('../middleware/auth')

const  {register, login, getdashboardpage, getloginpage, getregisterpage, logout} = require('../controller/newUser');

router.post('/register', register)
router.post('/login', login)
router.get('/register', getregisterpage)
router.get('/login', getloginpage)
router.get('/dashBoard',requiredAuthProcess, getdashboardpage)
router.get('/logout', logout)


module.exports = router;