const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Event = require('../models/eventModel')
const User = require('../models/userModel')
const { getDistanceBetween } = require('../utils/getDistanceBetween')
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
    const {
        name,
        description,
        userId,
        location,
        latitude,
        longitude,
        startDate,
        endDate,
        public,
    } = req.body
    if (
        !name ||
        !description ||
        !userId ||
        !location ||
        !latitude ||
        !longitude ||
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
        latitude,
        longitude,
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
            latitude: event.latitude,
            longitude: event.longitude,
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
const uninviteUserFromEvent = asyncHandler(async (req, res) => {
    //Return only the event
    try {
        let pullEventInvitedPromise = await Event.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    usersInvited: mongoose.Types.ObjectId(req.params.userId),
                },
            },
            {
                new: true,
            }
        )
        let pullEventAttendingPromise = await Event.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    usersAttending: mongoose.Types.ObjectId(req.params.userId),
                },
            },
            {
                new: true,
            }
        )
        let pullUserInvitedPromise = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $pull: {
                    eventsInvited: mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
                new: true,
            }
        )
        let pullUserAttendingPromise = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $pull: {
                    eventsAttending: mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
                new: true,
            }
        )
        let result = await Promise.all([
            pullEventAttendingPromise,
            pullEventInvitedPromise,
            pullUserAttendingPromise,
            pullUserInvitedPromise,
        ])
        console.log(result)
        res.status(200).json(result)
    } catch {
        res.status(400)
        throw new Error('Could not uninvite user from event')
    }
})
const inviteUserToEvent = asyncHandler(async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $addToSet: {
                    eventsInvited: mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
                new: true,
            }
        )

        let updatedEvent = await Event.findOneAndUpdate(
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
        res.status(200).json(updatedEvent)
    } catch {
        res.status(400)
        throw new Error('Could not invite user to event')
    }
})

const getEventInvitedUsers = asyncHandler(async (req, res) => {
    //potentially move this to userController. Go the other way and find the users where the eventId is present.
    try {
        const eventUsers = await Event.findOne({ _id: req.params.id }).populate(
            'usersInvited'
        )
        res.status(200).json(eventUsers)
    } catch {
        res.status(400)
        throw new Error('Could not get invited users')
    }
})

const getEventAttendingUsers = asyncHandler(async (req, res) => {
    try {
        const eventAttendingUsers = await Event.findOne({
            _id: req.params.id,
        }).populate('usersAttending')
        res.status(200).json(eventAttendingUsers)
    } catch {
        res.status(400)
        throw new Error('Could not get attending users')
    }
})

const getEventsNearby = asyncHandler(async (req, res) => {
    let lat = req.query.lat
    let lon = req.query.lon
    let radius = req.query.radius
    //get all events
    //loop thru the events, performing a calculation on lat lon (need a utils)
    //if calculation is less than radius, return it
    try {
        const allEvents = await Event.find().lean()
        let matchingEvents = []
        for (let event of allEvents) {
            const distance = getDistanceBetween(
                lat,
                lon,
                event.latitude,
                event.longitude
            )
            if (distance <= radius) {
                matchingEvents.push({
                    ...event,
                    distance,
                })
            }
        }
        res.status(200).json(matchingEvents)
    } catch {
        res.status(400)
        throw new Error('Could not get nearby events')
    }
})

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    deleteEventById,
    inviteUserToEvent,
    getEventInvitedUsers,
    getEventAttendingUsers,
    uninviteUserFromEvent,
    getEventsNearby,
}
