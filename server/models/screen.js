const mongoose = require('mongoose');

const screenSchema = mongoose.Schema({

    nom: { type: String, required:  true },
    ressource: { type: String, required:  true },

    // image: { type: String }

});


module.exports=  mongoose.model("screen", screenSchema);