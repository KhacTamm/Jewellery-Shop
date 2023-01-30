const express = require('express')
const router = express.Router()

const AccountControllers = require('../app/controllers/AccountControllers')

router.post('/signup', AccountControllers.registerAccount)
router.post('/signin', AccountControllers.loginAccount)
router.get("/logout", (req, res) => {
    res.session = null
    res.cookie("jwt", "", { maxAge: "1" })
})

module.exports = router