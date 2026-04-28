const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const products = require('./data/products');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();

    // Find or create an admin user to act as vendor
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@foodvault.com',
        password: 'admin123',
        role: 'admin',
      });
    }

    // Attach vendor id to each product
    const sampleProducts = products.map((p) => ({ ...p, vendor: adminUser._id }));

    await Product.insertMany(sampleProducts);

    console.log('✅ Data Imported Successfully!');
    console.log(`📧 Admin Login → Email: admin@foodvault.com | Password: admin123`);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('🗑️  Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
