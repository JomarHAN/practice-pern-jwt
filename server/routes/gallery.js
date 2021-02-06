const router = require('express').Router()
const pool = require('../pgConfig')
const { cloudinary } = require('../utils/cloudinary')

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
                        .then((result) => {
                            res.status(200).send({
                                message: "Updated Successfully!",
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
