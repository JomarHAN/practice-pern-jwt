const authentication = require('../middleware/authentication');
const router = require('express').Router();
const pool = require('../pgConfig');
const { cloudinary } = require('../utils/cloudinary');
// const image = require('../../../Images/50778307_220876468860036_4356712785229381632_n.jpg')

//get user name
router.get('/', authentication, async (req, res) => {
    try {
        const userName = await pool.query("SELECT * FROM usersImage WHERE user_id = $1", [req.user])
        res.json(userName.rows[0])

    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})

//upload images
router.post('/upload', (req, res) => {
    const data = {
        title: req.body.title,
        image: req.body.image,
        userId: req.body.userId
    }

    cloudinary.uploader.upload(data.image)
        .then((image) => {
            pool.connect((err, client) => {
                const insertQuery = 'INSERT INTO usersImage (user_gallery) VALUES($1) WHERE user_id = $2 RETURNING *';
                const values = [image.secure_url, data.userId]

                client.query(insertQuery, values)
                    .then((result) => {
                        res.json(result)
                    }).catch((err) => {
                        console.error(err.message)
                        res.status(500).json('Fairlure')
                    })
            })
        }).catch((err) => {
            console.error(err.message)
            res.status(500).json('Fairlure')
        })
})

module.exports = router;