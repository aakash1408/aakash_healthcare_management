const mongoose = require('mongoose');
require('dotenv').config();

const connectTodb = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aegis_healthcare';
  try {
    await mongoose.connect(mongoUri, {
      // useNewUrlParser and useUnifiedTopology are defaults in mongoose v6+
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectTodb;
