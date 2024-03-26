const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    // postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    postedBy: {type: String},
    content: { type: String, required: true },
    lastAccessed: { type: Date, default: Date.now },
    // reactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reaction'}],
    reactions: [{type: String}],
  });

  const Thought = mongoose.model('Thought', thoughtSchema);

//   const handleError = (err) => console.error(err);

//   Thought.find({})
//   .exec()
//   .then(async collection => {
//     if (collection.length === 0) {
//       const results = await Reaction.insertMany(
//         [
//             { postedBy: 'John', content: [] },
//             { postedBy: 'Jenny', content: [] },
//         ]
//       );
//       return console.log('Thought inserted', results);
//     }
//     return console.log('Already populated');
//   })
//   .catch(err => handleError(err));


module.exports = Thought;