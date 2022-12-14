const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        username: {
            type: String,
            required: [true, 'Please add a username'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        eventsInvited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
        eventsAttending: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
        ],
        eventsDeclined: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
        ],
        profileImageUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
