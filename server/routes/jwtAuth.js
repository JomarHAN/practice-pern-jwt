const router = require('express').Router();
const pool = require("../pgConfig")
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authentication = require('../middleware/authentication');

//register new user
router.post('/register', validInfo, async (req, res) => {
    try {
        //1. destructure req.body
        const { name, password, email } = req.body

        //2. Check if email has been registered yet, if it exists then throw an error
        const verify = await pool.query('SELECT * FROM usersImage WHERE user_email = $1', [email])

        if (verify.rows.length !== 0) {
            return res.status(401).json("Email Already Registered")
        }

        //3. Bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPwd = await bcrypt.hash(password, salt)

        //4. Insert user's info into database and returning back
        const newUser = await pool.query("INSERT INTO usersImage (user_name, user_password, user_email) VALUES($1, $2, $3) RETURNING *", [name, bcryptPwd, email])

        //5. Give user a token to access
        const token = await jwtGenerator(newUser.rows[0].user_id)

        res.json({ token })


    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error")
    }
})

//login
router.post('/login', validInfo, async (req, res) => {
    try {

        //1. destructure req.body
        const { email, password } = req.body

        //2. check if email exist, if no then throw an error
        const userVerified = await pool.query("SELECT * FROM usersImage WHERE user_email = $1", [email])
        if (userVerified.rows.length === 0) {
            res.status(401).json("Email or Password is incorrect!")
        }

        //3. Check if incoming password the same user into database
        const userInfo = await bcrypt.compare(password, userVerified.rows[0].user_password)
        if (!userInfo) {
            res.status(401).json("Email or Password is incorrect!")
        }

        //4. give user a token
        const token = await jwtGenerator(userVerified.rows[0].user_id)

        res.json({ token })
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})

//is-verify
router.get('/is-verify', authentication, async (req, res) => {
    try {
        res.json(true)
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})

module.exports = router;