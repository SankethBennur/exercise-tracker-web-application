const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
     {
          name: {type: String, required:true},
          username: {type: String, required: true},
          description: {type: String},
          duration: {type: Number, required: true},
          dateOfExercise: {type: Date},
     },
     {timestamps: true}
);

module.exports = mongoose.model('Exercises', exerciseSchema); // Collection Name and Updates can be viewed in MongoDB Atlas