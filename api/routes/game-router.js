const router = require('express').Router();
require('dotenv').config();
const igdb = require('igdb-api-node').default;

module.exports = router;

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await igdb(
    process.env.IGDB_CLIENT_ID,
    process.env.IGDB_ACCESS_TOKEN
  )
    .fields(['*', 'cover.*'])
    .where(`id = ${id}`)
    .request('/games');

  res.send(response.data[0]);
});

router.post('/', async (req, res) => {
  const { gameIds } = req.body;

  const response = await igdb(
    process.env.IGDB_CLIENT_ID,
    process.env.IGDB_ACCESS_TOKEN
  )
    .fields(['*', 'cover.*'])
    .where(`id = (${gameIds.join(',')})`)
    .request('/games');

  res.send(response.data);
});
