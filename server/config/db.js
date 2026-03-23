const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Auto-seed default admin if none exists
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('admin123', salt);
      await Admin.create({ username: 'admin', password });
      console.log('Successfully auto-seeded default admin user!');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
