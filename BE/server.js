const express = require('express');
const db = require('./utils/db');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());

db(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', require('./routes/user'));

module.exports = app;