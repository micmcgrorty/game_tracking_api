const router = require('express').Router();
require('dotenv').config();
const igdb = require('igdb-api-node').default;

module.exports = router;

router.post('/', async (req, res) => {
  const { searchTerm } = req.body;

  const response = await igdb(
    process.env.IGDB_CLIENT_ID,
    process.env.IGDB_ACCESS_TOKEN
  )
    .fields(['*', 'cover.*', 'platforms.*'])
    .limit(100)
    .where('category = 0 & cover != null')
    .search(searchTerm)
    .request('/games');

  res.send(response.data);
});
