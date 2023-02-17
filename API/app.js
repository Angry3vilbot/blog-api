require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')

const indexRouter = require('./routes/index');

const app = express();
const mongoDB = process.env.DB_LINK
mongoose.connect(mongoDB)

const db = mongoose.connection
db.on('error', console.error.bind(console, "MongoDB Connection Error: "))

mongoose.set('toJSON', { virtuals: true });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: '*' }))

app.use('/', indexRouter);

module.exports = app;
