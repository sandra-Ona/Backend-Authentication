const router = require('express').Router();

const  {register, login, getdashboardpage, getloginpage, getregisterpage} = require('../controller/newUser');

router.post('/register', register)
router.post('/login', login)
router.get('/register', getregisterpage)
router.get('/login', getloginpage)
router.get('/dashBoard', getdashboardpage)


module.exports = router;