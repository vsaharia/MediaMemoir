const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
        .populate('notes', {title: 1, important: 1})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        hashedPassword
    })

    const savedUser = await user.save()

    return response.status(201).json(savedUser)
})

module.exports = usersRouter