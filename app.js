'use strict';

const express = require('express');
const mongoose = require("mongoose");
const User = require("./models/user");

const AuthRoute = require('./routes/auth')
const authenticate = require('./middleware/authenticate')
const app = express();

require("dotenv/config");

app.use(express.json());
app.use(AuthRoute);

app.get("/", authenticate, (req, res) => {
    res.send("First Request");
});

mongoose.connect(process.env.DB_CONNECTION_STRING, 
{ useUnifiedTopology: true, useNewUrlParser: true });

app.listen(3000);

module.exports = app;
