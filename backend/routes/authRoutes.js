const express = require('express');
const Router = express.Router();
const {googleAuth,getGoogleAuthURL} = require('../controller/authctrl')
Router.get('/google',googleAuth)
Router.get('/google/callback',googleAuth)

module.exports = Router