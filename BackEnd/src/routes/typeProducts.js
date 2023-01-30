const express = require('express')
const router = express.Router()

const TypeProductControllers = require('../app/controllers/TypeProductControllers')

router.post('/create', TypeProductControllers.create)
router.get('/:id', TypeProductControllers.getOneTypeProducts)


module.exports = router