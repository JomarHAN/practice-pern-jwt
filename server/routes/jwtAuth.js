const router = require('express').Router();
const pool = require("../pgConfig")
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
//register new user
router.post('/register', async (req, res) => {
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
        const token = await jwtGenerator(newUser)

        res.json({ token })


    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;