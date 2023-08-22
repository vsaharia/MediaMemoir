const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 1,
        required: true
    },
    important: Boolean,
    genre: {
        type: String,
    },
    author: {
        type: String,
        minLength: 1,
        required: true
    },
    month: {
        type: String,
    },
    year: {
        type: Number,
    },
    rating: {
        type: Number
    },
    review: {
        type: String,
        minLength: 20,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)