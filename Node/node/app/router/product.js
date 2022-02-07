const express = require('express')
const Router = express.Router()

const {
    createProduct, 
    getAllProducts, 
    getOneProduct,
    updateProduct,
    deleteProduct 
} = require ('../controllers/product')


Router.post('/add_product', createProduct)
Router.get('/', getAllProducts)
Router.get('/:id', getOneProduct)
Router.put('/update_product/:id', updateProduct)
Router.delete('/delete_product/:id', deleteProduct)

module.exports = Router