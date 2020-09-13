const express = require('express');
const { errors } = require('celebrate');
const path = require('path');
const routers = require('./routers');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(routers);
app.use(errors());

module.exports = app;
