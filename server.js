const express = require('express');
const db = require('./config/connection');
// Require model
const { User, Reaction, Thought } = require('./models');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/all-users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/all-reactions', async (req, res) => {
    try {
        const users = await Reaction.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/all-thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/create-user', async (req, res) => {
    // Use db connection to add a document
    const result = await User.create(req.body);
    res.json(result);
  });

app.post('/create-thought/', async (req, res) => {
    // Use db connection to add a document
    const user = await User.findById(req.body.postedBy);
    
    const result = await Thought.create(req.body);
    user.thoughts = [result.id, ...user.thoughts]
    user.save()
    res.json(result);
  });

  //create a reaction
  app.post('/create-reaction', async (req, res) => {
    // Use db connection to add a document
    const result = await Reaction.create(req.body);
    res.json(result);
});

  // id 1 is the user and id 2 is the friend who is getting added to that user's list
  app.post('/create-friend/:id1/:id2', async (req, res) => {
    const user = await User.findById(req.params.id1);
    const friend = await User.findById(req.params.id2);
    user.friends = [friend.id,...user.friends]
    user.save()
    res.json(friend);
  });

// app.post('/create-reaction', async (req, res) => {
//     // Use db connection to add a document
//     const thought = await Thought.findById(req.body.thoughtId);
//     const result = await Reaction.create({ 
//         content: req.body.content, 
//         postedBy: req.body.postedBy 
//     });
//     thought.reactions.push(result.id);
//     thought.save();
//     res.json(result);
// });

app.post('/create-reaction/:thoughtId', async (req, res) => {
    try {
        // Find the thought by ID
        const thought = await Thought.findById(req.params.thoughtId);

        if (!thought) {
            return res.status(404).json({ error: "Thought not found" });
        }

        // Create the reaction
        const reaction = await Reaction.create({
            content: req.body.content,
            postedBy: req.body.postedBy
        });

        // Associate the reaction with the thought
        thought.reactions.push(reaction._id); // Assuming reaction._id is the ID of the created reaction
        await thought.save();

        res.status(201).json({ thought, reaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// delete a user
app.delete('/delete-user/:id', async (req, res) => {
    // Use db connection to delete a document
    // const result = await User.findByIdAndDelete(req.params.id);
    const result = await User.deleteOne({'_id': req.params.id})
    res.json(result);
})

// delete a friend.. id1 is for who you are, id2 is who yu want to delete
app.delete('/delete-friend/:id1/:id2', async (req, res) => {
    // Use db connection to delete a document
    const user = await User.findById(req.params.id1);
    const friend = await User.findById(req.params.id2);
    user.friends = user.friends.filter(id => id!= friend.id)
    user.save()
    res.json(friend);
});

// delete a reaction
app.delete('/delete-reaction/:id', async (req, res) => {
    // const reaction = await Reaction.findById(req.params.id)
    const result = await Reaction.deleteOne({'_id': req.params.id});
    res.json(result);
})

// delete a thought
app.delete('/delete-thought/:id', async (req, res) => {
    // const reaction = await Reaction.findById(req.params.id)
    const result = await Thought.deleteOne({'_id': req.params.id});
    res.json(result);
})

// edit a thought
app.put('/edit-thought/:id', async (req, res) => {
    const thought = await Thought.findById(req.params.id);
    thought.content = req.body.content;
    thought.save();
    res.json(thought);
})

// edit a reaction
app.put('/edit-reaction/:id', async (req, res) => {
    const reaction = await Reaction.findById(req.params.id);
    reaction.content = req.body.content;
    reaction.save();
    res.json(reaction);
})

// once we start the webserver we can't modify it so this needs to be at the bottom
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}`);
    });
})