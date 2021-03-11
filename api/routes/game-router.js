const router = require('express').Router();
require('dotenv').config();
const igdb = require('igdb-api-node').default;

module.exports = router;

router.get('/popular', async (req, res) => {
  const response = await igdb(
    process.env.IGDB_CLIENT_ID,
    process.env.IGDB_ACCESS_TOKEN
  )
    .fields(['*', 'cover.*'])
    .limit('9')
    .sort('rating', 'desc')
    .where(
      `first_release_date != null &
      first_release_date < ${new Date().getTime()} & 
      rating != null &
      rating_count > 250 &
      category = 0`
    )
    .request('/games');

  res.send(response.data);
});

router.get('/new-releases', async (req, res) => {
  const response = await igdb(
    process.env.IGDB_CLIENT_ID,
    process.env.IGDB_ACCESS_TOKEN
  )
    .fields(['*', 'cover.*'])
    .limit('9')
    .sort('first_release_date', 'desc')
    .where(
      `first_release_date != null &
      first_release_date < ${new Date().getTime()} &
      category = 0`
    )
    .request('/games');

  res.send(response.data);
});

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