const Product = require('../models/Product')
const TypeProduct = require('../models/TypeProduct')
const mongoose = require("mongoose");
const { BadRequestError} = require ("../helpers/api-error");
const handLePromise = require("../helpers/promise.helper");

class AdminControllers {

    createTypeProducts(req, res, next){
        console.log(req.body)
        const typeProduct = new TypeProduct(req.body)
        typeProduct.save()
    }

    getAllTypeProducts = async (req, res, next) => {
        const condition = { };
        const { name } = req.query;

        const [error ,documents] = await handLePromise(TypeProduct.find(condition));

        if (error) {
            return next(new BadRequestError(500, "An error occurred while retrieving contacts"));
        }

        return  res.send(documents);
    }

    getOneTypeProducts = async (req, res, next) => {

        const {id} = req.params;

        const type = await TypeProduct.findById(id).populate('products')

        // console.log(type)

        return res.status(200).json({products: type.products})
    }

    DeleteOneTypeP = async (req, res, next) => {
        const { id } = req.params;
        console.log(id)
        const condition = {
            _id: id && mongoose.isValidObjectId(id) ? id: null,
        };
        console.log(id);
        const [error, document] = await handLePromise(TypeProduct.findOneAndDelete(condition));

        if (error) {
            return next(new BadRequestError(500, `Could not delete Product with id=${req.params.id}`));
        }
        if (!document) {
            return next(new BadRequestError(404, "Contact not found"));
        }

        return res.send({ message: "Contact was deleted successfully", });
    }

    DeleteAllTypeP = async (req, res, next) => {
        const [error, data] = await handLePromise(
            TypeProduct.deleteMany({})
        );
        if (error){
            return next(new BadRequestError(500, "An error occurred while removing all contacts"));
        }

        return res.send({
            message: `${data.deletedCount} contacts were deleted successfully`, 
    });
    };

    getAll = async (req, res, next) => {
        const condition = { };
        const { name } = req.query;

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
        }
    
        const [error, document] = await handLePromise (Product.findOne(condition));
    
        if (error){
            return next (new BadRequestError(500, `Error retreiving contact with id=${req.params.id}`));
        }
    
        if (!document) {
            return next(new BadRequestError(404, "Contact not found"));
        }
        return res.send(document);
    };
   
    create = async (req, res, next ) => {
        
        const { id } = req.params;

        const product = new Product(req.body)

        const type = await TypeProduct.findById(id)

        await product.save()

        type.products.push(product)

        await type.save()
    }

    update = async (req, res, next) => {

        if(Object.keys(req.body).length === 0) {
            return next (new BadRequestError(400, "Data to update can not be empty"));
        }

        const { id } = req.params;

        const condition = {
            _id: id && mongoose.isValidObjectId(id) ? id : null,
        }

        const newproduct = req.body
    
        //remove curent type
        const productCurrent = await Product.findById(condition)
        console.log(productCurrent)

        const types = await TypeProduct.findById(productCurrent.type._id)

        const index = await types.products.indexOf(productCurrent._id)

        // console.log("/////////////////////////////////")
        // console.log(productCurrent._id)
        // console.log("--------------------------------")
        // console.log(index)
        // console.log("--------------------------------")

        await types.products.splice(index, 1 ) 
        
        // console.log(types.products) 

        await types.save()

        //Update sp
        await Product.findOneAndUpdate(condition,newproduct)
        const product = await Product.findOneAndUpdate(condition,newproduct)


        const typeNew = await TypeProduct.findById(product.type._id)

        // console.log(product.type)

        typeNew.products.push(product._id)

        // console.log(typeNew)
        
        await typeNew.save()

    
        return res.send({ message: "Contact was updated successfully", });
    };

    forceDelete = async (req, res, next) => {
        const { id } = req.params;
        const condition = {
            _id: id && mongoose.isValidObjectId(id) ? id: null,
        };

        const product = await Product.findById(id)

        const typeID = product.type._id

        const types = await TypeProduct.findById(typeID)

        const index = types.products.indexOf(product._id)

        await types.products.splice(index, 1 ) 

        await types.save()

        console.log(types.products.indexOf(product._id))

        // console.log(types.products)
        // console.log(product)

        const [error, document] = await handLePromise(Product.findOneAndDelete(condition));

        if (error) {
            return next(new BadRequestError(500, `Could not delete Product with id=${req.params.id}`));
        }
        if (!document) {
            return next(new BadRequestError(404, "Contact not found"));
        }

        return res.send({ message: "Contact was deleted successfully", });
    }
    
    // Delete all contacts of a user from the database 
    deleteAll = async (req, res, next) => {

        const [error, data] = await handLePromise(
            Product.deleteMany({})
        );

        if (error){
            return next(new BadRequestError(500, "An error occurred while removing all contacts"));
        }

        return res.send({
            message: `${data.deletedCount} contacts were deleted successfully`, 
    });
    };

}

module.exports = new AdminControllers()
