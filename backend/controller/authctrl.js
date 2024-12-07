const UserModel = require("../models/userModel");
const { oauth2Client } = require("../utils/googleClient");
const axios = require('axios')
const jwt = require('jsonwebtoken');

exports.googleAuth = async (req, res, next) => {
  const code = req.query.code;
  try {
    console.log("hi");
    
    //   const googleRes = await oauth2Client.getToken(code);
    try {
        console.log("Authorization code:", code);
        const googleRes = await oauth2Client.getToken(code);
        console.log("Token response:", googleRes);
    } catch (error) {
        console.error("Error fetching token:", error.response?.data || error.message);
        return res.status(500).json({ message: "Failed to fetch Google tokens" });
    }
      oauth2Client.setCredentials(googleRes.tokens);
      console.log("hi");

      console.log("hi",googleRes);
      
      const userRes = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
      );
      const { email, name, picture } = userRes.data;
      console.log("hi",userRes);
      let user = await UserModel.findOne({ email });

      if (!user) {
          user = await UserModel.create({
              name,
              email,
              image: picture,
          });
      }
      const { _id } = user;
      const token = jwt.sign({ _id, email },
          process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_TIMEOUT,
      });
      res.status(200).json({
          message: 'success',
          token,
          user,
      });
  } catch (err) {
      res.status(500).json({
          message: "Internal Server Error"
      })
  }
};

exports.getGoogleAuthURL = (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.redirect(url);
};
  
