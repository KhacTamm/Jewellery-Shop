const cartRouter = require('./cart')
const adminRouter = require('./admin')
const productsRouter = require('./product')
const accountRouter = require('./account')
const { adminAuth } = require("../app/middleware/auth.js")

function route(app) {

    app.use('/user', accountRouter)

    app.use('/admin',adminAuth, adminRouter)

    app.use('/product', productsRouter)

    app.use('/cart', cartRouter)

}

module.exports = route
