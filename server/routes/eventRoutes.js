const express = require('express')
const router = express.Router()
const { createEvent, getEvents } = require('../controllers/eventController')

const protect = require('../middleware/authMiddleware')

router.post('/', createEvent)
router.get('/', getEvents)
module.exports = router
