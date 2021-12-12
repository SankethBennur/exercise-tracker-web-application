const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema is a class. Hence, starting letter should be in CAPS

const userSchema = new Schema({
          // a field
          username: {
               // datatype and validation
               type: String,
               required: true,
               unique: true,  // will show duplicate error
               minlength: true,
               trim: true
          }
     },
     {timestamps: true}
);

// Time to export. 'User' is name given to collection.
module.exports = mongoose.model('User', userSchema); // Collection Name and Updates can be viewed in MongoDB Atlas