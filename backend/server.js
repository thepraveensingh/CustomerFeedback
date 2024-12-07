const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
const feedbackRoutes = require("./routes/testingRoute")
const authRoutes = require('./routes/authRoutes')
require('dotenv').config();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  origin: 'http://localhost:5173', // Replace with the frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and other credentials
}));
require('./models/mongoModel')
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); // or 'unsafe-none'
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// app.use('/api/uploads', feedbackRoutes);

// app.use('/api/auth',authRoutes)
// const { oauth2Client } = require('../utils/googleClient');
const { oauth2Client } = require("./utils/googleClient");

app.get('/api/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'],
  });
  res.redirect(url); // Redirect to Google's authorization page
});

app.get('/api/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ message: 'Authorization code is missing' });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,{headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      }}
    );
    res.status(200).json(userInfo.data); // Return user info
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.listen(port,()=>{
  console.log(`server is running at ${port}`);
})