// index.js
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
