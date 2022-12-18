const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5001

//Connect to database
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Hello')
})

app.get('/*', function (req, res) {
    res.sendFile(
        path.join(__dirname, '../simple-rsvp/index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/events', require('./routes/eventRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
