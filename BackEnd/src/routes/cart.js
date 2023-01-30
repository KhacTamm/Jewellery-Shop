const express = require('express')
const router = express.Router()
const cardControllers = require('../app/controllers/CartControllers')

router.get('/add-to-cart/:id', cardControllers.addCart)
router.get('/remove/:id', cardControllers.removeOne)
router.get('/remove/', cardControllers.removeAll)
router.get('/', cardControllers.getCart)

module.exports = router
