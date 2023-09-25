
const dotenv = require('dotenv');
dotenv.config(); 

const mongouri = process.env.MONGO_URI;



const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;
