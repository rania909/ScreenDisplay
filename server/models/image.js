const mongoose = require('mongoose')

const canvasImageSchema = new mongoose.Schema({
  image: String,
})

module.exports = CanvasImage = mongoose.model('canvasImage', canvasImageSchema)
