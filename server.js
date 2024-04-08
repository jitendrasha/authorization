const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3000
app.use(bodyParser.json());
const {JwtAppStrategy} = require("./helper/jwthelper");

require('./db_congif/db')
const movirouter = require('./route/routes')
const passport = require('passport')
app.use('/api', movirouter)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
passport.use("app", JwtAppStrategy);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))