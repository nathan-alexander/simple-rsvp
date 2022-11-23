const asyncHandler = require('express-async-handler')

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

module.exports = {
    createEvent,
    getEvents,
}
