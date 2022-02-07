const Product = require('../modele/Product')
const ProductModel = require ('../modele/Product')
const ObjectID = require('mongoose').Types.ObjectId

module.exports = {
    createProduct: async(req, res) => {
        const {name, description, price, categorieId} = req.body

        try {
            const product = await new ProductModel({
                name,
                description, 
                price,
                categorieId,
                createdAt: new Date().toISOString(),
            })
            product.save()
            return res.status(201).json({product: product.name})
        }
        catch(error) {
            return res.status(400).json({error})
        }
    },

    getAllProducts: async(req, res) => {
        try {
            const products = await ProductModel.find().populate({
                path: 'categorieId',
                model: 'categorie',
            })
            return res.status(200).json({products})

        } catch (error) {
            return res.status(400).send({error})
        }
    },

    getOneProduct: (req, res) => {
        const productId = req.params.id

        if(!ObjectID.isValid(productId)) {
            return res.status(400).send("Product Id is NOT FOUND ===" + productId)
        }

        ProductModel.findById(productId, (err, data) => {
            if(!err) {
                return res.status(200).json({data})
            } else {
                return res.status(400).json({err})
            }
        })
            .clone()
            .populate({path: 'categorieId', model: 'categorie'})
            .exec()
    },

    updateProduct: (req, res) => {
        const {name, description, price} = req.body

        const productId = req.params.id 
        
        if(!ObjectID.isValid(productId)) {
            return res.status(400).send("Product Id is NOT FOUND ===" + productId)
        }

        ProductModel.findByIdAndUpdate(
            {_id: productId},
            {
                $set: {
                    name,
                    description,
                    price,
                    updatedAt: new Date().toISOString(),
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}, (err, data) => {
                if(!err) {
                    return res.status(200).json({data})
                } else {
                    return res.status(500).json({err})
                }
            }
        )

    },

    deleteProduct: async(req, res) => {
        const productId = req.params.id

        if(!ObjectID.isValid(productId)) {
            return res.status(400).send("Product id is NOT FOUND ===" + productId)
        }

        try {

            await ProductModel.deleteOne({_id: productId}).exec()
            
            return res.status(200).json({message: "Product deleted successfully"})
            
        } 
        catch(err) {

            return res.status(500).json({error})
            
        }
    }
}
