const mongoose = require('mongoose')

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/Velastro')
        console.log("Connected to mongodb")
        
    } catch(error){
        console.log("Connected failure!!!")
    }
}


module.exports = { connect }