const express = require('express')
const router = express.Router()

const ProductControllers = require('../app/controllers/ProductControllers')

const AdminControllers = require('../app/controllers/AdminControllers')


router.get('/getAllTypeProducts', AdminControllers.getAllTypeProducts)
router.get('/typeProducts/:id', AdminControllers.getOneTypeProducts)
router.get('/', ProductControllers.getAll)
router.get('/:id', ProductControllers.findOne)


module.exports = router
