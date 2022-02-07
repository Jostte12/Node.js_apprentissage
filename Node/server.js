const express = require ('express')
const app = express()
const dotenv = require ('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

require ('./node/app/database/db_config')

const category = require('./node/app/router/categorie')
const product = require('./node/app/router/product')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'1000mb'}))
app.use(express.json())

app.use('/api/mycategories', category)
app.use('/api/myproducts', product)

// ON essaye de faire une requête
app.get('/', (req, res) => {
    res.send(`<h1>Hello API Rest</h1>`)
})

app.listen(process.env.PORT, () => {
    console.log(`Le server listen to a port ${process.env.PORT}`)
})

console.log("-----------------------------------")
console.log("------------- API -----------------")
console.log("-----------------------------------")

