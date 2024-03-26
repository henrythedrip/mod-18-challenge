const connection = require('../config/connection');
const { User, Reaction, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }
  
    // let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
    // if (reactionCheck.length) {
    //   await connection.dropCollection('reactions');
    // }

    // let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    // if (thoughtCheck.length) {
    //   await connection.dropCollection('thoughts');
    // }
  
    const users = [
      {username: 'Billy Bob'},
      {username: 'Jameson Painter'},
      {username: 'Jenny Jebediah'},
      {username: 'Frank Furter'},
      {username: 'Bartholomeu Simp'},
      {username: 'JoBack MorseHan'},
      {username: 'Byle Krovlovski'},
      {username: 'Stan Smith'},
      {username: 'Cric Eartman'},
      {username: 'Sutters Btotch'},
    ];
    // const reactions = [
    //   {content: 'Wow!'},
    //   {content: 'Fire!!'},
    //   {content: 'Sick...'},
    //   {content: 'Dope?'},
    //   {content: 'Cool!'},
    //   {content: 'Lame :('},
    //   {content: 'Disgusting!'},
    //   {content: 'Horrible...'},
    //   {content: 'Slamming...'},
    //   {content: 'Repulsive!!'},
    // ];
    // const thoughts = [
    //   {content: 'this is really time consuming'},
    //   {content: 'i lack the creativity for this'},
    //   {content: 'asdlkjfghasldkjfghasldkjfg'},
    //   {content: 'i once watched a man drown and did nothing'},
    //   {content: 'just got some taco bell'},
    //   {content: 'ENLARGE YOUR PENIS FOR ONLY 4 PAYMENTS OF $49.95'},
    //   {content: 'how am i supposed to see the dark net if it is all dark?'},
    //   {content: 'google dot com hot single why dont cougars near me dont reply to my messages???'},
    //   {content: 'google dot com what is this lump in my pants'},
    //   {content: 'where them freaky girls at'},
    // ];
  

    // // create collections
    // // connection.db.createCollection('users')
    // // users is automagically created by insertMany?
    await User.collection.insertMany(users);
    // // connection.createCollection('thoughts')
    // // connection.createCollection('reactions')


  
    // // then make refs
    // (await User.find()).forEach((user, index, all_users) => {
    //   // // create new reaction that corresponds to users index in results
    //   const newReaction = new Reaction({
    //     content: reactions[index],
    //     postedBy: all_users[(index + 5) % 10].id
    //   });
    //   Reaction.collection.insertOne(newReaction)

    //   // create thought that corresponds to users index in results
    //   const newThought = new Thought({
    //     content: thoughts[index],
    //     postedBy: user.id,
    //     reactions: [newReaction]
    //   });
    //   Thought.collection.insertOne(newThought)

    // })


    // loop through the saved videos, for each video we need to generate a video response and insert the video responses
    console.table(users);
    // console.table(reactions);
    // console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });