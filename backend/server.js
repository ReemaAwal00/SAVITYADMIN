const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
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
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Enable cookies if needed
  })
);

// Middleware
app.use(express.json());

// Routes
app.use('/admins', adminRoutes);
app.use('/users', userRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
