const express= require( 'express');
const mongoose =require("mongoose");

const screens = require( '../models/screen.js');



 const getScreens = async (req, res) => { 
    try {
        const screenshare = await screens.find();
                
        res.status(200).json(screenshare);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
   
}









 const getScreen = async (req, res) => { 
    const { id } = req.params;

    try {
        const screenshare = await screens.findById(id);
        
        res.status(200).json(screenshare);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

 const createScreen = async (req, res) => {
    const { nom, ressource } = req.body;
 
    const newscreen = new screens({ nom, ressource})

    try {
        await newscreen.save();

        res.status(201).json(newscreen );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

 const updatescreen = async (req, res) => {
    const { image } = req.params;
    // const { nom, ressources } = req.body;
    const ressource=req.body.image
    console.log(req.params);
    console.log(req.body);
    console.log("helllo word");
    
    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    
    // const updateScreens = { nom, ressources , _id: id };
    // console.log(updateScreens);
    let screen= await screens.findOneAndUpdate(image, {
        ressource:req.body.image
    }, { new: true });

    console.log(screen);
    res.json(screen);
}

 const deleteScreen = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);

    await screens.findByIdAndRemove(id);

    res.json({ message: "screen deleted successfully." });
}
module.exports = {
    getScreens,
    getScreen,
    createScreen,
    updatescreen,
    deleteScreen,
   
  };