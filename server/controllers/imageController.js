const express= require( 'express');
const mongoose =require("mongoose");
const CanvasImage = require('../models/image')

//Convert Base64 to Image.png

const convertToFile = (base64Img) => {
  const fs = require('fs')
  var base64Data = base64Img.replace(/^data:image\/png;base64,/, '')
  const fileName = 'img' + Date.now() + '.png'
  fs.writeFile('./images/' + fileName, base64Data, 'base64', function (err) {
    if (err) {
      console.log(err)
    }
  })

  return domainName + '/' + fileName
}
// save image path to mongodb

const savePathToMongoDb = (imgPath) => {
  const newCanvas = new CanvasImage({ image: imgPath })
  newCanvas.save()
}
//@desc Get image /api/postImage
const postimage = async (req, res) => {
  base64Img = req.body.data
  const imgPath = convertToFile(base64Img)
  console.log(typeof imgPath)
  savePathToMongoDb(imgPath)
  res.json({ data: req.body })
}

//Rania Image

// const getAllImages = async (req, res) => { 
//   try {
//       const CanvasImage = await CanvasImage.find();
              
//       res.status(200).json(CanvasImage);
//   } catch (error) {
//       res.status(404).json({ message: error.message });
//   }
// }

//id image 
// const getSingleImage = async (req, res) => { 
//   const { id } = req.params;

//   try {
//       const CanvasImage = await CanvasImage.findById(id);
      
//       res.status(200).json(CanvasImage);
//   } catch (error) {
//       res.status(404).json({ message: error.message });
//   }
// }



module.exports = { postimage   , getAllImages}
