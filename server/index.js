const express = require('express')
const app = express()
require('./dbConfig')
const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./apis')
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({}))


const PORT = 5000
app.use(router)
app.listen(PORT,()=>console.log('server is running on', PORT))