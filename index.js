const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user.route')
const carRoute = require('./routes/car.route')
const bookingRoute = require('./routes/booking.route')
const authRoute = require('./routes/auth.route')
const detailRoute= require('./routes/detail.route')

const PORT = 8000
const app  = express()
app.use(cors())

app.use('/user', userRoute)
app.use('/car', carRoute)
app.use('/booking', bookingRoute)
app.use('/auth', authRoute)
app.use('/detail', detailRoute)


// check role   
const authControll = require('./controllers/auth.controller')
app.get('/checkadmin', authControll.authorize, (req, res) => {
    const role = req.user.role

    return res.json({
        message : `Your role is ${role}`
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


