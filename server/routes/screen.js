const  express = require('express');
const { getScreen ,getScreens, createScreen  , updatescreen, deleteScreen} = require( '../controllers/screenController.js');

const router = express.Router();


router.get('/', getScreens);
router.post('/', createScreen);
router.get('/:id', getScreen);
router.patch('/:id', updatescreen);
router.delete('/:id', deleteScreen);

module.exports= router
       