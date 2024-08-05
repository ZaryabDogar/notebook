
const dotenv = require('dotenv');
dotenv.config();

const mongouri = process.env.MONGO_URI||'mongodb://zaryabdogar23:dogar1234@ac-vy5dsms-shard-00-00.wzthjpm.mongodb.net:27017,ac-vy5dsms-shard-00-01.wzthjpm.mongodb.net:27017,ac-vy5dsms-shard-00-02.wzthjpm.mongodb.net:27017/notes?ssl=true&replicaSet=atlas-q9d2en-shard-0&authSource=admin&retryWrites=true&w=majority';



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
