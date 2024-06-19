const mongoose = require('mongoose');

async function getConnection(url){
   return mongoose.connect(url)
}

module.exports = getConnection