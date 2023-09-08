const mongoose=require('mongoose')
const mongouri='mongodb://localhost:27017/'


const connect_to_mongo=async()=>{
   await mongoose.connect(mongouri)
 
    console.log('connected to mongo successfully')


}
module.exports=connect_to_mongo;