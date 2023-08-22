const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        /*validate: {
            validator: /^[a-zA-Z0-9_]{3,15}$/, 
            message: "Usernames must be 3 to 15 characters long and contain only alphanumeric characters and underscores (_)."
        }*/
    },
    name: String,
    hashedPassword: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.hashedPassword
    }
})

module.exports = mongoose.model('User', userSchema)