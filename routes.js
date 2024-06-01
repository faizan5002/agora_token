// routes.js
const express = require('express');
const router = express.Router();
const { generateRTCToken } = require('./controllers');

const nocache = (_, resp, next) => {
  resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  resp.header('Expires', '-1');
  resp.header('Pragma', 'no-cache');
  next();
};

router.get('/rtc/:channel/:role/:tokentype/:uid', nocache, generateRTCToken);

module.exports = router;
