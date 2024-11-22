// index.cjs
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.cjs');
const teacherRoutes = require('./routes/teacherRoutes.cjs'); 
const studentRoutes = require('./routes/studentRoutes.cjs'); 
const classRoutes = require('./routes/classRoute.cjs'); 
const authMiddleware = require('./middlewares/authMiddleware.cjs'); 

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Public route
app.use('/auth', authRoutes);

// Protected routes only accessible to authenticated users
app.use('/teachers', authMiddleware, teacherRoutes);
app.use('/students', authMiddleware, studentRoutes);
app.use('/classes', authMiddleware, classRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});