const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Event = require('../models/eventModel')

// @desc   Get events
// @route  /api/events
// @access Public
// @method GET

const getEvents = asyncHandler(async (req, res) => {
    Event.find({}).then(function (events) {
        res.status(200).json(events)
    })
})

// @desc   Create an event
// @route  /api/events
// @access Public
// @method GET
const createEvent = asyncHandler(async (req, res) => {
    const { name, description, userId, location, startDate, endDate, public } =
        req.body
    if (
        !name ||
        !description ||
        !userId ||
        !location ||
        !startDate ||
        !endDate ||
        !public
    ) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    const event = await Event.create({
        name,
        description,
        userId,
        location,
        startDate,
        endDate,
        public,
    })

    if (event) {
        res.status(201).json({
            _id: event._id,
            name: event.name,
            description: event.description,
            userId: event.userId,
            location: event.location,
            startDate: event.startDate,
            endDate: event.endDate,
            public: event.public,
        })
    } else {
        res.status(400)
        throw new Error('Invalid event data')
    }
})
const getEventById = asyncHandler(async (req, res) => {
    //Find id
    const event = await Event.findOne({ _id: req.params.id })
    if (event) {
        res.status(200).json(event)
    } else {
        res.status(404)
        throw new Error('No event found')
    }
})

const deleteEventById = asyncHandler(async (req, res) => {
    try {
        await Event.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json('Event deleted')
    } catch {
        res.status(400)
        throw new Error('Something went wrong')
    }
})

const inviteUserToEvent = asyncHandler(async (req, res) => {
    try {
        await Event.findOneAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    usersInvited: mongoose.Types.ObjectId(req.params.userId),
                },
            },
            {
                new: true,
            }
        )
    } catch {
        res.status(400)
        throw new Error('Could not invite user to event')
    }
})

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    deleteEventById,
    inviteUserToEvent,
}
