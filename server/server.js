const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDb = require('./db/db')
const CanvasImage = require('./models/image')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const domainName = process.env.DOMAIN_NAME
const screenRoures = require('./routes/screen.js');
app.use(cors());

app.use(express.json())
app.use(express.static('images'))
// app.use('/images', imagesRoute);

app.get('/', function (req, res) {
  CanvasImage.find({}, (err, items) => {
    if (err) {
      console.log(err)
    } else {
      console.log(items)
      res.render('listimages', { items: items })
    }
  })
})

app.post('/postImage', function (req, res) {
  base64Img = req.body.data
  const imgPath = convertToFile(base64Img)
  console.log(typeof imgPath)
  savePathToMongoDb(imgPath)
  res.json({ data: req.body })
})



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

const savePathToMongoDb = (imgPath) => {
  const newCanvas = new CanvasImage({ image: imgPath })
  newCanvas.save()
}


//get des images
app.get('/getImages', function (req, res) {
  CanvasImage.find({}, (err, items) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(items)
      res.json(items)
    }
  })
})

app.get('/getImages/:id', (req, res) => {

  const id = req.params.id

  CanvasImage.findById({ _id: id }, (err, item) => {

    if (err) {

      res.json({ error: err.message })

    } else {

      if (!item) {

        res.json({ message: "Image Item Not Found" })

      } else {

        res.json(item)

      }



    }
  })

})


//Rania

app.use('/screens',screenRoures);





const start = async () => {
  try {
    await connectDb()
    console.log('it s working')
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`)
    })
  } catch (error) {
    console.log(error)
    console.log('Failed to connect to the database, server is not running.')
  }
}

start()
