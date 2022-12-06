const express = require('express')
const router = express.Router()
const {
    createEvent,
    getEvents,
    getEventById,
    deleteEventById,
    inviteUserToEvent,
    getEventInvitedUsers,
    getEventAttendingUsers,
    uninviteUserFromEvent,
    getEventsNearby,
    editEventById,
} = require('../controllers/eventController')

const protect = require('../middleware/authMiddleware')

router.get('/', getEvents)
router.post('/', createEvent)
router.get('/:id', getEventById)
router.delete('/:id', deleteEventById)
router.get('/:id/invited', getEventInvitedUsers)
router.get('/:id/attending', getEventAttendingUsers)
router.get('/nearby/find', getEventsNearby)
router.put('/invite/:id/:userId', inviteUserToEvent)
router.put('/uninvite/:id/:userId', uninviteUserFromEvent)
router.put('/:id', editEventById)

module.exports = router
