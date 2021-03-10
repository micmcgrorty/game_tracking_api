const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/search', require('./api/routes/search-router'));

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${port}`);
});