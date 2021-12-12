const router = require('express').Router();
const exercise = require('../dbmodels/exercise-model.js');



// Get Method - READ
router.route('/').get((req, res) => {
     exercise.find()
          .then(exercises => {res.json(exercises)})
          .catch(err => {res.status(400).json('Error: ' + err)});
});

// Post Method - CREATE
// BUG: Even if user is not created, Exercise is added.
// We will need JSON Web Tokenizer to solve this issue.
router.route('/add').post((req, res) => {
     // initializting exercise document by an object
     const newExercise = new exercise({
          name: req.body.exerciseName,
          username: req.body.userName,
          description: req.body.description,
          duration: Number(req.body.duration),
          dateOfExercise: Date.parse(req.body.exerciseDate)
     });
     // property-names must match as in Schema

     newExercise.save()
          .then(() => {res.json('New Exercise Added!')})
          .catch(err => {res.status(400).json('Error: ' + err)});
});

// Get by ID - DELETE
router.route('/:id').get((req, res) => {
     exercise.findById(req.params.id)
          .then(exercise => {res.json(exercise)})
          .catch(err => {res.status(400).json('Error Occurred - ' + err)});
});

// Update by ID - UPDATE
router.route('/:id/update').post((req, res) => {
     exercise.findById(req.params.id)
          .then((newExercise) => {   // newExercise parameter passed is fetched from .findById(req.params.id)
               newExercise.name = req.body.exerciseName;
               newExercise.username = req.body.userName;
               newExercise.description = req.body.description;
               newExercise.duration = Number(req.body.duration);
               newExercise.dateOfExercise = Date.parse(req.body.exerciseDate);

               newExercise.save()
                    .then(() => {res.json('Exercise has been updated!')})
                    .catch(err => {res.json(err)});
          })
          .catch(err => {err});
});

// Delete by ID
router.route('/:id').delete((req, res) => {
     exercise.findByIdAndDelete(req.params.id)
          .then(exercise => {res.json('Exercise Deleted.')})
          .catch(err => {res.json('Error Occurred - '+ err)});
});



// exporting route, being required by server.js
module.exports = router;