[![Build Status](https://travis-ci.org/BenedyktT/gastroCalculator.svg?branch=master)](https://travis-ci.org/BenedyktT/gastroCalculator)


This project is simple app that allows you to get nutrition table out of your favourite recipe.
It uses jest for testing, react with redux in a front end, and custom styles with sass.
User can add his recipe to database, and browse other users recipes as well

live project is available here:
### [http://gastrocalculator.herokuapp.com](http://gastrocalculator.herokuapp.com)

## Prerequisites

after cloning this project you need to install necessary dependencies of the server and client as well

### `npm run deps`

Install dependencies for client and server

You also need 3 env variables in .env file to connect with API and with mongodb

### APPLICATION_ID

### APPLICATION_KEY

### MONGO_URI

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This command will use concurrently to run server and client (server will be run on port 5000 )

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

For testing endpoints I've used supertest

local database will be run for selected tests

## Biggest issues on the way

1. This structure is prepared to deploy client and server from on place (for example heroku)
   To not exceed project scope too much I decided to use create react app - which uses jest, because client has its own node_modules - using it main project triggered conflict. In order to fix it I needed to eject create-react-app, which allowed me to remove jest from client. More optimised way would to be to create webpack config manually.

## Cool things about it

1. It creates local database in test enviroment instead of making real db calls
1. Have unit tests as well as integration tests of endpoints
1. It works with cool API Edamam which uses language processing to recognize and calculate nutrition values
1. State mangament is well organised, every action is dispatched trough function, not directly in component, so front end part is easy to scale

## Sad things

Due to fast development process app has couple of drawbacks

1. Names of variables could be improved
1. Minimum amount of comments (I know, I am sorry)
1. Frontend isn't well tested mostly because of issue with jest conflict described above, I skipped it simply because assigment is focused on backend
1. main background image isn't lazy loaded and isn't sufficiently optimized
