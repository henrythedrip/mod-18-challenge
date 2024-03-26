const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  thoughts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Thought'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  lastAccessed: { type: Date, default: Date.now },
});


const User = mongoose.model('User', userSchema);

// const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// Note that two documents can have the same name value
// User.find({})
//   .exec()
//   .then(async collection => {
//     if (collection.length === 0) {
//       const results = await User.insertMany(
//         [
//           { username: 'John', thoughts: [], friends: [] },
//           { username: 'Jenny', thoughts: [], friends: [] },
//           { username: 'Harry', thoughts: [], friends: [] },
//           { username: 'Hannah', thoughts: [], friends: [] },
//           { username: 'Kim', thoughts: [], friends: [] },
//           { username: 'Frank', thoughts: [], friends: [] },
//           { username: 'Sam', thoughts: [], friends: [] },
//         ]
//       );
//       return console.log('User inserted', results);
//     }
//     return console.log('Already populated');
//   })
//   .catch(err => handleError(err));

module.exports = User;
