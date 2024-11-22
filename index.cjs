// index.cjs
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.cjs');
const teacherRoutes = require('./routes/teacherRoutes.cjs'); // Ensure this path is correct
const studentRoutes = require('./routes/studentRoutes.cjs'); // Ensure this path is correct
const classRoutes = require('./routes/classRoute.cjs'); // Ensure this path is correct
const authMiddleware = require('./middlewares/authMiddleware.cjs'); // Ensure this path is correct

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Public route
app.use('/auth', authRoutes);

// Protected routes
app.use('/teachers', authMiddleware, teacherRoutes);
app.use('/students', authMiddleware, studentRoutes);
app.use('/classes', authMiddleware, classRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});