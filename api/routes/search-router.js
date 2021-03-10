const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();

module.exports = router;

router.post('/', function (req, res) {
  const { searchTerm } = req.body;

  axios({
    url: 'https://api.igdb.com/v4/games',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': process.env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`
    },
    data: `fields *; limit 20; search "${searchTerm}";`
  })
    .then(async (response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
});
