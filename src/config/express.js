const express = require('express');
const app = express();
const connectDB = require('./database');
require('dotenv').config();

connectDB();

app.use(express.json());

module.exports = app;
