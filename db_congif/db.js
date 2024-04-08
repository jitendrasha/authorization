const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost:27017/movie', { useNewUrlParser: true }).then(() => {
        console.log('connected');
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db