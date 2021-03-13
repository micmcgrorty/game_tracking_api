# Game Tracking Api

This is an api that communicates with the IGDB api in various different ways to get information about games.

## Structure

Search router - contains one route for performing a search on the IGDB api
Games router - contains four routes for interacting with the IGDB api: multiple games, single game, recent releases and popular games

### Running locally

To run the app locally, you will need to run `npm install` and then `npm run server`. Note: you'll need to ensure any environment variables set in the `.env.example` are correctly set in a local `.env` file, and also create an IGDB account to obtain credentials for accessing the IGDB api.

#### Related repo

The frontend app repo can be found in my `game_tracking_app` repo.

##### Running example

A running example of this app, with the backend hosted on Heroku, can be found at `https://games.micmcgrorty.dev`
