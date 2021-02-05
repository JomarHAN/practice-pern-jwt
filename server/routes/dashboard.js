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

//delete images
router.delete('/delete', (req, res) => {
    const cloud_id = req.query.cloud_id;

    cloudinary.uploader.destroy(cloud_id)
        .then(() => {
            pool.connect((err, client) => {
                const insertQuery = 'DELETE FROM gallery WHERE cloud_id = $1';
                const values = [cloud_id];

                client.query(insertQuery, values)
                    .then((result) => {
                        res.status(200).send({
                            message: "Image was deleted!",
                            result
                        })
                    }).catch((err) => {
                        res.status(500).send({
                            message: "Image could not be deleted!",
                            err
                        })
                    })
            })
        }).catch((err) => {
            res.status(500).send({
                message: "Failure",
                err
            })
        })
})


//update images
router.put('/update', (req, res) => {
    const cloud_id = req.query.cloud_id;

    const data = {
        title: req.body.title,
        image: req.body.image
    }

    cloudinary.uploader.destroy(cloud_id)
        .then(() => {
            cloudinary.uploader.upload(data.image, {
                upload_preset: "testing"
            }).then((image) => {
                pool.connect((err, client) => {
                    const insertQuery = 'UPDATE gallery SET image_title = $1, image_url = $2, cloud_id = $3 WHERE cloud_id = $4';
                    const values = [data.title, image.secure_url, image.public_id, cloud_id]

                    client.query(insertQuery, values)
                        .then(() => {
                            res.status(200).send({
                                message: "Updated Successfully!"
                            })
                        }).catch((err) => {
                            res.status(500).send({
                                message: "Failure",
                                err
                            })
                        })
                })
            }).catch((err) => {
                res.status(500).send({
                    message: "Failure",
                    err
                })
            })
        }).catch((err) => {
            res.status(500).send({
                message: "Failure",
                err
            })
        })
})

module.exports = router;