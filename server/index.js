const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

//register and login
app.use('/auth', require('./routes/jwtAuth'))

app.listen(port, () => console.log(`Listening on localhost:${port}`))