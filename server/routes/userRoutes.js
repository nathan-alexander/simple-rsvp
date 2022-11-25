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
} = require('../controllers/userController')

const protect = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/:id', getUserById)
router.get('/email/:email', getUserByEmail)
router.get('/:id/events', getUserEvents)
router.get('/:id/events/invitations', getEventsInvitedTo)

module.exports = router
