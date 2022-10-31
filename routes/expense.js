const express = require('express')

const router = express.Router();

const usercontroller = require('../controllers/user')

const controller = require('../controllers/expense')

router.post('/signup',usercontroller.signup)

router.post('/login',usercontroller.login)

router.post('/details',controller.postdetails)

router.get('/userinfo',controller.getdetails)

router.delete('/delete/:id',controller.delete);


module.exports = router;