This project is simple app that allows you to get nutrition table out of your favourite recipe.
It uses jest for testing, react with redux in a front end, and custom styles with sass.
User can add his recipe to database, and browse other users recipes as well

## Prerequisites

after cloning this project you need to install necessary dependencies of the server and client as well

### `yarn add && yarn add --prefix client`

or

### `npm i && npm i --prefix client`

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

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Biggest issues on the way

1. This structure is prepared to deploy client and server from on place (for example heroku)
   To not exceed project scope too much I decided to use create react app - which uses jest, because client has its own node_modules - using it main project triggered conflict. In order to fix it I needed to eject create-react-app, which allowed me to remove jest from client. More optimised way would to be to create webpack config manually.

## Cool things about it

1. It creates local database in test enviroment instead of making real db calls
2. Have unit tests as well as integration tests of endpoints
3. It works with cool API Edamam which uses language processing to recognize and calculate nutrition values

## Sad things

Due to fast development process app has couple of drawbacks

1. Names of variables could be improved
2. Minimum amount of comments (I know, I am sorry)
3. Frontend isn't well tested mostly because of issue with jest conflict described above
