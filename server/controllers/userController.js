const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const Events = require('../models/eventModel')
const { default: mongoose } = require('mongoose')
const { async } = require('rxjs')
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
            profileImageUrl: user.profileImageUrl || null,
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})
const updateUser = asyncHandler(async (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                profileImageUrl: req.body.profileImageUrl,
            },
        },
        {
            new: true,
        },
        (err, user) => {
            if (err) {
                console.log(err)
                res.status(400)
                throw new Error('Could not update user')
            }

            res.status(200).json(user)
        }
    )
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
// @desc   Get events the user is hosting
// @route  /api/users/:id/events
// @access Public
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
// @desc   Get user by id
// @route  /api/users/:id/
// @access Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400)
        throw new Error('No user found')
    }
})
// @desc   Get user by email
// @route  /api/users/email/:email
// @access Public
const getUserByEmail = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.params.email })
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400)
        throw new Error('No user found')
    }
})

// @desc   Get events that the user is invited to
// @route  /api/users/:id/events/invited
// @access Public
const getEventsInvitedTo = asyncHandler(async (req, res) => {
    try {
        const userEvents = await User.findOne({ _id: req.params.id }).populate(
            'eventsInvited'
        )
        res.status(200).json(userEvents)
    } catch {
        res.status(400)
        throw new Error('Could not get events invited to')
    }
})
// @desc   Get events that the user is attending
// @route  /api/users/:id/events/attending
// @access Public
const getEventsAttending = asyncHandler(async (req, res) => {
    try {
        const attendingEvents = await user
            .findOne({ _id: req.params.id })
            .populate('eventsAttending')

        res.status(200).json(attendingEvents)
    } catch {
        res.status(400)
        throw new Error('Could not get events attending')
    }
})
// @desc   Accept an invitation to an event
// @route  /api/users/:id/events/:eventId/accept
// @access Public
const acceptEventInvitation = asyncHandler(async (req, res) => {
    //return only the user
    try {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    eventsDeclined: mongoose.Types.ObjectId(req.params.eventId),
                },
            }
        )
        await Events.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    usersDeclined: mongoose.Types.ObjectId(req.params.id),
                },
            }
        )
        await Events.findOneAndUpdate(
            { _id: req.params.eventId },
            {
                $addToSet: {
                    usersAttending: mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
                new: true,
            }
        )
        let userEventAttending = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    eventsAttending: mongoose.Types.ObjectId(
                        req.params.eventId
                    ),
                },
            },
            {
                new: true,
            }
        )
        console.log(userEventAttending)
        res.status(200).json(userEventAttending)
    } catch {
        res.status(400)
        throw new Error('Could not accept event invitation')
    }
})
// @desc   Accept an invitation to an event
// @route  /api/users/:id/events/:eventId/decline
// @access Public
const declineEventInvitation = asyncHandler(async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    eventsAttending: mongoose.Types.ObjectId(
                        req.params.eventId
                    ),
                },
            }
        )
        await Events.findOneAndUpdate(
            { _id: req.params.eventId },
            {
                $pull: {
                    usersAttending: mongoose.Types.ObjectId(req.params.id),
                },
            }
        )
        let addEventAttendingPromise = await Events.findOneAndUpdate(
            { _id: req.params.eventId },
            {
                $addToSet: {
                    usersDeclined: mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
                new: true,
            }
        )
        let userAttending = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    eventsDeclined: mongoose.Types.ObjectId(req.params.eventId),
                },
            },
            {
                new: true,
            }
        )

        res.status(200).json(userAttending)
    } catch {
        res.status(400)
        throw new Error('Could not decline event invitation')
    }
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
    getEventsAttending,
    acceptEventInvitation,
    declineEventInvitation,
    updateUser,
}
