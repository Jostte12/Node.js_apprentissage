const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
})

module.exports = mongoose.model('categorie', categorySchema)