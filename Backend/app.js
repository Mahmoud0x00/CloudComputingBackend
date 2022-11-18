const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// import the function that ininitiates a DB connection.
const initiateDBConnection = require('./config/db');
const authenitcationRouter = require('./routes/auth');

// Let the dotenv package read and parse environment variables in the ./config/.env file
dotenv.config({
  path: './config/.env'
});

// Access the port environment variable using process.env
const PORT = process.env.PORT;

const app = express();


// an express middleware to parse JSON data in request body.
app.use(express.json());

app.use(cors());

app.use('/api/auth', authenitcationRouter);

app.listen(PORT, async () => {
  console.log(`Server has been started and is listening to port ${PORT}`);
  // Call the asynchronous function to initiate the DB connection once the server starts listening.
  await initiateDBConnection();
});
