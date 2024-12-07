const express = require('express');
const router = express.Router();
const {getFeedback} = require('../controller/ctrl')
router.get('/feedbacks',getFeedback)

module.exports = router;