const authentication = require('../middleware/authentication');
const router = require('express').Router();
const pool = require('../pgConfig')

//get user name
router.get('/', authentication, async (req, res) => {
    try {
        const userName = await pool.query("SELECT user_name FROM usersImage WHERE user_id = $1", [req.user])
        res.json(userName.rows[0])

    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})

//upload images
router.post('/upload', async (req, res) => {
    try {

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Something went wrong!!!" })
    }
})

module.exports = router;