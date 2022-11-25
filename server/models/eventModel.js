const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add an event name'],
        },
        description: {
            type: String,
            required: [true, 'Please add an event description'],
        },
        userId: {
            type: String,
            required: true,
        },
        location: {
            street: {
                type: String,
                required: true,
            },
            street2: {
                type: String,
                required: false,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zip: {
                type: String,
                required: true,
            },
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        public: {
            type: Boolean,
            required: true,
        },
        usersInvited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        usersAttending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Event', eventSchema)
