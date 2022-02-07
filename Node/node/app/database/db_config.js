const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/voitures', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected successfully"))
.catch((err) => console.log("Connection failed", err))