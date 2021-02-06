const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = async (req, res, next) => {
    const jwtToken = req.header('token')
    if (!jwtToken) {
        res.status(401).json("Unauthorize")
    }

    try {
        const payload = await jwt.verify(jwtToken, process.env.SECRET_TOKEN)
        if (!payload.user) {
            return true
        }
        req.user = payload.user
        next()
    } catch (error) {
        console.error(error.message)
        res.status(401).json("Unauthorize")
    }
}