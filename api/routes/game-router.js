const router = require('express').Router();
require('dotenv').config();
const igdb = require('igdb-api-node').default;

module.exports = router;

router.get('/popular', async (req, res) => {
  const date = new Date();
  const response = await igdb(
    process.env.IGDB_CLIENT_ID,
    process.env.IGDB_ACCESS_TOKEN
  )
    .fields(['*', 'cover.*', 'platforms.*'])
    .limit('9')
    .sort('rating', 'desc')
    .where(
      `first_release_date != null &
      first_release_date < ${new Date().getTime()} &
      first_release_date > ${(date.getTime() / 1000).toFixed(0) - 31536000} &
      rating != null &
      rating_count > 50 &
      cover != null &
      category = 0`
    )
    .request('/games');

  res.send(response.data);
});

router.get('/new-releases', async (req, res) => {
  const date = new Date();
  const response = await igdb(
    process.env.IGDB_CLIENT_ID,
    process.env.IGDB_ACCESS_TOKEN
  )
    .fields(['*', 'cover.*', 'platforms.*'])
    .limit('9')
    .sort('first_release_date', 'desc')
    .where(
      `first_release_date != null &
      first_release_date < ${(date.getTime() / 1000).toFixed(0)} &
      cover != null &
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
    .fields(['*', 'cover.*', 'platforms.*'])
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
    .fields(['*', 'cover.*', 'platforms.*'])
    .where(`id = (${gameIds.join(',')}) & cover != null`)
    .request('/games');

  res.send(response.data);
});
