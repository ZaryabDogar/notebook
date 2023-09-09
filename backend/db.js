const mongoose = require('mongoose')
const mongouri = 'mongodb://localhost:27017/notebook'
// const mongouri = 'mongodb+srv://zaryabdogar23:dogar1234@cluster0.wzthjpm.mongodb.net/?retryWrites=true&w=majority'


const connecttomongo = async () => {
    await mongoose.connect(mongouri)

    console.log('connected to mongo successfully')


}



module.exports = connecttomongo;