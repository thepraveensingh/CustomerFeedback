const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI 

mongoose.connect(MONGO_URI)
  .then(()=>{console.log('MongoDb connected');
  })
  .catch((err)=>{
    console.log('Error connecting mongodb',err);    
  })