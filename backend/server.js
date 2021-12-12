const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // meant for the middleware to use the backend



// --------------------------------------
// MONGOOSE

const uri = process.env.ATLAS_URI;  // Used for connecting with mongodb atlas database uri
mongoose.connect(uri, {});

const connection = mongoose.connection;
connection.once('open', () => {
     console.log(`Connection to MongoDB is successful!`);
});



// -------------------------------------
// CRUD Operation Routes

// Importing exercises-route.js and users-route.js and using them for GET/POST requests.
const exercisesRoute = require('./urlPaths/exercises-route.js');
const usersRoute = require('./urlPaths/users-route.js')

// app.use is used for middleware - connecting frontend to backend
// here, the frontend part, url, is used for backend part, GET & POST methods
app.use('/exercises', exercisesRoute);
app.use('/users', usersRoute);



// ------------------------------------
// CREATING A LISTEN SERVER 

const port = process.env.PORT || 5000;

app.listen(port, () => {
     console.log(`Server is running on port: ${port}`);
});