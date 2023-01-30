const express = require('express')
const router = express.Router()

const AdminControllers = require('../app/controllers/AdminControllers')
// const TypeProductControllers = require('../app/controllers/TypeProductControllers')



router.get('/getAllTypeProducts', AdminControllers.getAllTypeProducts)
router.post('/createTypeProducts', AdminControllers.createTypeProducts)
router.post('/create/:id', AdminControllers.create)

router.delete('/typeProducts', AdminControllers.DeleteAllTypeP)
router.delete('/typeProducts/:id', AdminControllers.DeleteOneTypeP)
router.get('/typeProducts/:id', AdminControllers.getOneTypeProducts)

router.get('/:id', AdminControllers.findOne)
router.delete('/:id', AdminControllers.forceDelete)
router.put('/:id', AdminControllers.update)

router.delete('/', AdminControllers.deleteAll)
router.get('/', AdminControllers.getAll)


module.exports = router