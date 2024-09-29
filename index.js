const express = require('express')
const mongoose = require('mongoose')
// const { MongoClient } = require('mongodb'); 


const app = express()

// const uri = 'mongodb://rachelhuang:ecQwXjDTtvloBOfm@localhost:27017/leader'
const uri = 'mongodb+srv://ayush:CUT0riRz5RsGy1jO@technova24cluster.nqmry.mongodb.net/user_data'


// const client = new MongoClient(uri);

async function run() {
  try {
    // await client.connect();
    const client = mongoose.connect(uri).then((res) => {
        console.log("Connected to MongoDB!");
    })

    const userSchema = mongoose.Schema({
        profilePicture: {type: String},
        username: { type: String },
        rank: { type: Number },
        waterCount: {type: Number},
        waterGoal: {type: Number, default: 2.7},
        sleepGoal: {type: Number}
    });

    const leaderboardSchema = mongoose.Schema({
      profilePicture: {type: String},
      username: {type: String},
      waterCount: {type: Number},
      waterGoal: {type: Number},
      rank: {type: Number}
    })

    const User = mongoose.model("users", userSchema);
    const Leaderboard = mongoose.model("leaderboard", leaderboardSchema, 'leaderboard');


    const doc = await Leaderboard.find();

    console.log(doc);

    // (await User.create({username: "ayush", rank: 10, waterCount: 10, waterGoal: 20})).save();

    // const doc = User.findOne({"username": "navybluechili"});
    // console.log(doc)


  } catch (error) {
    console.log("Error " + error);
  }

//   finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
}

run()