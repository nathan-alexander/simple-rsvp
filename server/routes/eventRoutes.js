const express = require('express')
const router = express.Router()
const {
    createEvent,
    getEvents,
    getEventById,
    deleteEventById,
    inviteUserToEvent,
} = require('../controllers/eventController')

const protect = require('../middleware/authMiddleware')

router.post('/', createEvent)
router.get('/', getEvents)
router.get('/:id', getEventById)
router.delete('/:id', deleteEventById)
router.put('/invite/:id/:userId', inviteUserToEvent)
module.exports = router
