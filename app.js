'use strict';

const express = require('express');
const app = express();

app.use(express.json())
app.use('/unity', require('./routes/unity'));

app.get('/', (req, res) => {
  res.status(200).send("Welcome to our unity server");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
