const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const Events = require('../models/eventModel')
// @desc   Register a new user
// @route  /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body
    if (!name || !email || !password || !username) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    //Find if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        username,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
// @desc   Login a user
// @route  /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    const user = await User.findOne({ email })

    // Check user and passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
    }
    res.status(200).json(user)
})

const getUserEvents = asyncHandler(async (req, res) => {
    //Find user
    const user = await User.findOne({ _id: req.params.id })
    if (user) {
        const events = await Events.find({ userId: user._id })
        res.status(200).json(events)
    } else {
        res.status(400)
        throw new Error('No user found')
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400)
        throw new Error('No user found')
    }
})

const getUserByEmail = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.params.email })
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400)
        throw new Error('No user found')
    }
})

const getEventsInvitedTo = asyncHandler(async (req, res) => {
    //Find user
})

// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getUserEvents,
    getEventsInvitedTo,
    getUserById,
    getUserByEmail,
}
