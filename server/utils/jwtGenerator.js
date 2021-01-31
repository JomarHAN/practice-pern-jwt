const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtGenerator = (user_id) => {
    const payload = {
        user_id: user_id
    }
    return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "1hr" })
}

module.exports = jwtGenerator