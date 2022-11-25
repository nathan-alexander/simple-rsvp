const express = require('express')
const router = express.Router()
const {
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
} = require('../controllers/userController')

const protect = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/:id', getUserById)
router.get('/email/:email', getUserByEmail)
router.get('/:id/events', getUserEvents)
router.get('/:id/invitations', getEventsInvitedTo)
router.get('/:id/attending', getEventsAttending)
router.put('/:id/events/:eventId/accept', acceptEventInvitation)
router.put('/:id/events/:eventId/decline', declineEventInvitation)

module.exports = router
