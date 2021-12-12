const router = require('express').Router();
const user = require('../dbmodels/user-model.js'); // import the User model from Schema

// Mongoose GET and POST functions will follow. Similar to HTTP requests and responses, but 
// They are quite hard to remember - the syntaxes and functions.



// GET function
// router.route().get();
router.route('/').get((req, res) => {
     // then() and catch() are promises.
     user.find()
          .then(users => {res.json(users)})
          .catch(err => {res.status(400).json('Error: ' + err)});
});

// POST function
// router.route().post();
router.route('/add').post((req, res) => {
     // initialise a document in user collection.
     let newUser = new user({username: req.body.userName});  // property-names must match as in Schema. userName passed from json during request.

     newUser.save()
          .then(() => {res.json('New User added!')})
          .catch(err => {res.status(400).json('User already exists!')});
});



// export route, being required by server.js
module.exports = router;