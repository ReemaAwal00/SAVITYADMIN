const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// app.use(cors({
//   origin: "http://localhost:3001", // Frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

// Allow CORS for specific origins
// const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3004", "http://localhost:3002"];
app.use(
  cors({
    origin: '*', // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Note: 'credentials: true' doesn't work with '*' in the `origin` setting
  })
);


// Middleware
app.use(express.json());

// Routes
app.use('/admins', adminRoutes);
app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/resources', resourceRoutes);
app.use('/bookings', bookingRoutes);
app.use('/appointments', appointmentRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
