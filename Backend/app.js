const express = require('express');
const dotenv = require('dotenv');

// import the function that ininitiates a DB connection.
const initiateDBConnection = require('./config/db');

// Let the dotenv package read and parse environment variables in the ./config/.env file
dotenv.config({
  path: './config/.env'
});

// Access the port environment variable using process.env
const PORT = process.env.PORT;

const app = express();

// an express middleware to parse JSON data in request body.
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`Server has been started and is listening to port ${PORT}`);
  // Call the asynchronous function to initiate the DB connection once the server starts listening.
  await initiateDBConnection();
});
