const Product = require('../models/Product')
const mongoose = require("mongoose");
const { BadRequestError} = require ("../helpers/api-error");
const handLePromise = require("../helpers/promise.helper");

class ProductControllers {

    getAll = async (req, res, next) => {
        const condition = { };
        const { name } = req.query;

        if (name) {
            condition.name = { $regex: new RegExp(name), $options: "i"};
        }
    
        const [error ,documents] = await handLePromise(Product.find(condition));

        if (error) {
            return next(new BadRequestError(500, "An error occurred while retrieving contacts"));
        }

        return  res.send(documents);
    }

    findOne = async (req, res, next ) => {
        const {id} = req.params;
        const condition = {
            _id: id && mongoose.isValidObjectId(id) ? id : null,
        };
    
        const [error, document] = await handLePromise (Product.findOne(condition));
    
        if (error){
            return next (new BadRequestError(500, `Error retreiving contact with id=${req.params.id}`));
        }
    
        if (!document) {
            return next(new BadRequestError(404, "Contact not found"));
        }
        return res.send(document);
    }
}

module.exports = new ProductControllers()
