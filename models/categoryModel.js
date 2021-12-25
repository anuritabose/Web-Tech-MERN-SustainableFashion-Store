const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({ //mongoose schema defines the structure of the document, default values,validators,etc
    name: {
        type: String,
        required: true,
        trim: true, //white spaces will be removed from both sides of the string
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Category", categorySchema) /*mongoose model is a wrapper on the mongoose schema, provides an interface to the database*/