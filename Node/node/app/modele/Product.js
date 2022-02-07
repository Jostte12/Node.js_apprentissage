const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    categorieId: {
        type: Schema.Types.ObjectId,
        ref: 'categorie',   
        // categorie est le categorie.js
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String
    },
})

module.exports = model('product', productSchema)