const express = require('express')
const router = express.Router()
const imageController = require('../controllers/imageController')
const image = require('../models/image')

router.route('/').post(imageController.postimage);
router.route('/').get(imageController.getAllImages);



module.exports = router
