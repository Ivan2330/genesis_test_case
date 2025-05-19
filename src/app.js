const express = require('express');
const path = require('path');

const routes = require(path.join(__dirname, 'routes'));

const app = express();

// Enable parsing of form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', routes);

module.exports = app;
