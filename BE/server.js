const express = require('express');
const db = require('./utils/db');
const cors = require('cors');
require('dotenv').config();
const app = express();
db(app);
app.use(cors());
app.use('/user', require('./routes/user'));
