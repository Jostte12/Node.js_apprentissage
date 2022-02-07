const express = require('express')
const Router = express.Router()
const {
    createCategory, 
    getAllCategories, 
    getOneCategorie,
    updateCategory,
    deleteCategory
} = require('../controllers/categorie')

Router.post('/ajout_categorie', createCategory)
Router.get('/', getAllCategories)
Router.get('/:id', getOneCategorie)
Router.put('/update_categorie/:id', updateCategory)
Router.delete('/delete_categorie/:id', deleteCategory)

module.exports = Router