const authentication = require('../middleware/authentication');
const router = require('express').Router();
const pool = require('../pgConfig');
const { cloudinary } = require('../utils/cloudinary');
// const image = require('../../../Images/50778307_220876468860036_4356712785229381632_n.jpg')

//get user name
router.get('/', authentication, async (req, res) => {
    try {
        const userName = await pool.query("SELECT * FROM userInfo WHERE user_id = $1", [req.user])
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
        user: req.body.user
    }

    cloudinary.uploader.upload(data.image, {
        upload_preset: "testing"
    })
        .then((image) => {
            pool.connect((err, client) => {
                const insertQuery = 'INSERT INTO gallery (image_title, image_url, cloud_id, user_id) VALUES($1, $2, $3, $4) RETURNING *';
                const values = [data.title, image.secure_url, image.public_id, data.user]

                client.query(insertQuery, values)
                    .then((result) => {
                        res.status(201).send({
                            message: "Successfully!",
                            result
                        })
                    }).catch((err) => {
                        res.status(500).send({
                            message: "Failure",
                            err
                        })
                    })
            })
        }).catch((err) => {
            res.status(500).json("Image could not uploaded!")
        })
})

//retrieve images
router.get('/retrieve/:user', (req, res) => {
    const user = req.params.user

    pool.connect((err, client) => {
        const insertQuery = 'SELECT * FROM gallery WHERE user_id = $1';
        const values = [user]

        client.query(insertQuery, values)
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(500).send({
                    message: "Failure",
                    err
                })
            })
    })
})



module.exports = router;