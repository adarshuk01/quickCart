// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes');
const discountRoutes = require('./routes/discountRoutes');
const geminiRoutes = require('./routes/geminiRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes =require('./routes/orderRoutes')
const paymentRoutes =require('./routes/paymentRoutes')

require('dotenv').config();


const cors = require('cors');

app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static('uploads'));




mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello from Express server!');
});

app.use("/api/auth", authRoutes);
app.use("/api", categoryRoutes)
app.use('/api/products', productRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);





// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
