//imprts Exprs application obj, uses it 2 get a Router object and then adds a couple of routes to it using the get() and post() method.
//require() usedtoloadandcache js modules
const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)


module.exports = router
