//routes link a http verb, a url pattern and a function to handle that pattern
const router = require('express').Router() //imprts Exprs application obj, uses it 2 get a Router object and then adds a couple of routes to it using the get() and post() method.
const productCtrl = require('../controllers/productCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/products')
    .get(productCtrl.getProducts)
    .post(auth, authAdmin, productCtrl.createProduct) //passing auth and authadmin


router.route('/products/:id')
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .put(auth, authAdmin, productCtrl.updateProduct)



module.exports = router //in the end, the module exports the Router object