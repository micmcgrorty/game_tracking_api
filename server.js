const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.APP_ORIGIN);
  });
}

app.use('/search', require('./api/routes/search-router'));

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${port}`);
});
