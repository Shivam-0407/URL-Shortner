const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,

    },
    visitedHistory:[{
        timestamp:{
            type:Number
        }
    }]
},{
    timestamps:true
})

const URL = mongoose.model('URL',urlSchema);

module.exports = URL;