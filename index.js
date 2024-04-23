const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user.route')
const carRoute = require('./routes/car.route')
const bookingRoute = require('./routes/booking.route')
const authRoute = require('./routes/auth.route')
const detailRoute= require('./routes/detail.route')
const path = require('path');

const PORT = 8000
const app  = express()

app.use(cors({
    origin: ['http://localhost:3000', 'https://mobigos.vercel.app/']
}));

app.use('/user', userRoute)
app.use('/car', carRoute)
app.use('/booking', bookingRoute)
app.use('/auth', authRoute, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000', 'https://mobigos.vercel.app/']);
})
app.use('/detail', detailRoute)
app.use(express.static(path.join(__dirname, 'image')));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


