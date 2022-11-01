const express = require('express')

const router = express.Router();

const usercontroller = require('../controllers/user')
const userauthenticate = require('../middleware/auth')

const purchasecontroller = require('../controllers/purchase')



const controller = require('../controllers/expense')

router.post('/signup',usercontroller.signup)

router.post('/login',usercontroller.login)

router.post('/details',userauthenticate.authenticate,controller.postdetails)

router.get('/userinfo',userauthenticate.authenticate,controller.getdetails)

router.delete('/delete/:id',userauthenticate.authenticate,controller.delete);

router.get('/purchase',userauthenticate.authenticate,purchasecontroller.purchasepremium)

router.post('/updatepurchase',userauthenticate.authenticate, purchasecontroller.updateTransactionStatus)


module.exports = router;