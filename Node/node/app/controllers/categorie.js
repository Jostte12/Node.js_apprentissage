const categorieModel = require('../modele/categorie')
const objectID = require('mongoose').Types.ObjectId

module.exports = {
    // créer une fonction createCategory
    createCategory: async(req, res) => {
        const {name} = req.body

        try {
            const categorie = await new categorieModel({
                name,
                createdAt: new Date().toISOString()
            })

            categorie.save()
            return res.status(201).json({categorie: categorie.name})
        }

        catch (error) {
            return res.status(400).send({error})
        }
    },

    getAllCategories: async(req, res) => {
        try {
            // chercher si la catégorie existe
            const categories = await categorieModel.find().sort({createdAt: -1})
            // console.log(categories);
            return res.status(200).json({categories})

        } catch (error) {
            return res.status(400).json({error})
        }
    },

    getOneCategorie: (req, res) => {
        // prendre le paramètre du id
        const categorieId = req.params.id
        console.log('ID categorie: ', categorieId)

        if(!objectID.isValid(categorieId)) {
            return res.status(400).send("Category NOT FOUND ===" + categorieId)
        }

        categorieModel.findById(categorieId, (err, data) => {
            if(!err) {
                return res.status(200).json({data})
            } else {
                return res.status(400).json({err})
            }
        })
    },

    updateCategory: (req, res) => {
        const {name} = req.body
        const categorieId = req.params.id

        if(!objectID.isValid(categorieId)) {
            return res.status(400).send("Category id NOT FOUND === " + categorieId)
        }

        categorieModel.findByIdAndUpdate(
            // entrer le Id correspondant
            {_id: categorieId},
            {
                // Ce que l'on veut modifier
                $set: {
                    name,
                    updatedAt: new Date().toISOString(),
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true},
            (err, data) => {
                if(!err) {
                    return res.status(200).send(data)
                }
                else {
                    return res.status(500).send({message: err})
                }
            }
        )
    },

    deleteCategory: async(req, res) => {
        const categorieId = req.params.id

        if (!objectID.isValid(categorieId)) {
            return res.status(400).send("Category NOT FOUND =====" + categorieId)
        }

        try {
            // exec() signifie éxecuter le code
            await categorieModel.deleteOne({_id: categorieId}).exec()
            return res.status(200).json({message: "Category delete successfully"})
        }
        catch (error) {
            return res.status(500).json({error})
        }
        
    }
}