const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CardControllers {

    getCart (req, res, next) {
        if(!req.session.cart) {
            return res.send({products: null});
        }
        const cart = new Cart(req.session.cart);
            return res.send({
            products: cart.generateArray(), 
            totalPriceCart: cart.totalPriceCart,
            totalQty: cart.totalQty
        });
    }

    addCart(req, res) {
        const productId = req.params.id;
        const quantity = req.query; 
        console.log(req.query)
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        console.log(req.session.cart)
    
        Product.findById(productId, function (err, product) {
            if(err) {
                return res.redirect('/');
            }
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/');
        })
   }

   removeOne(req, res, next) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.removeItem(productId);
        req.session.cart = cart;
        const Quantityproduct = cart.generateArray().length;
        console.log(Quantityproduct);
        if(Quantityproduct > 0){
            return res.send({
                products: cart.generateArray(),
                totalPriceCart: cart.totalPriceCart
            });
        } else {
            return res.send({
                products: null
            });
        }
    }

    removeAll(req, res, next) {
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.removeAll();
        req.session.cart = null;
        return res.send({
            products: null,
        });
    };
}

module.exports = new CardControllers();
