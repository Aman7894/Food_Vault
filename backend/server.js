const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();
console.log('Email configured:', process.env.EMAIL_USER ? 'YES' : 'NO');
console.log('Email password:', process.env.EMAIL_PASS ? 'YES' : 'NO');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL // Future Vercel URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Route files
const auth = require('./routes/authRoutes');
const products = require('./routes/productRoutes');
const orders = require('./routes/orderRoutes');
const contact = require('./routes/contactRoutes');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/products', products);
app.use('/api/v1/orders', orders);
app.use('/api/v1/contact', contact);

app.get('/', (req, res) => {
  res.send('Food Vault API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
