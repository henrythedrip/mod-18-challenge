const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, required: true },
    lastAccessed: { type: Date, default: Date.now },
  });

  const Reaction = mongoose.model('Reaction', reactionSchema);

//   const handleError = (err) => console.error(err);

//   Reaction.find({})
//   .exec()
//   .then(async collection => {
//     if (collection.length === 0) {
//       const results = await Reaction.insertMany(
//         [
//           { postedBy: 'John', reaction: 'test reaction John'},
//           { postedBy: 'Jenny', reaction: 'test reaction Jenny'},
//           { postedBy: 'Harry', reaction: 'test reaction Harry'},
//           { postedBy: 'Hannah', reaction: 'test reaction Hannah'},
//           { postedBy: 'Kim', reaction: 'test reaction Kim'},
//           { postedBy: 'Frank', reaction: 'test reaction Frank'},
//           { postedBy: 'Sam', reaction: 'test reaction Sam'},
//         ]
//       );
//       return console.log('Reaction inserted', results);
//     }
//     return console.log('Already populated');
//   })
//   .catch(err => handleError(err));

module.exports = Reaction;