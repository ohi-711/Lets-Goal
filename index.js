const express = require('express')
const mongoose = require('mongoose')
//const { MongoClient } = require('mongodb'); 


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

    Leaderboard.findOneAndUpdate({username:"navybluechili"}, {waterGoal: 0.7} )

    // Get all the documents in a specific schema -> map the documents and use this sort them least to greatest
    
  //   const aggregate = db.users.aggregate([

  //     {$project: {
  //         "username":1,
  //         "profilePicture":1,
  //         "waterCount":1,
  //         "waterGoal": 2.7
  //        }},
      
  
  //     {"$setWindowFields": {
  //       "sortBy": { "waterCount": -1 },
  //       "output": {
  //         "rank": { "$documentNumber": {}}}
  //     }},
  
  //     {$merge: {
  //         into: "leaderboard","whenMatched": "merge", "whenNotMatched": "insert" 
  //     }},
  // ])

    const doc = await Leaderboard.find();
    doc.sort((a, b) => a.rank - b.rank);

    const rankedUsers = doc.map(user => {
      return {
        username: user.username,
        rank: user.rank,
        profilePicture: user.profilePicture,
        waterCount: user.waterCount,
        waterGoal: user.waterGoal
      };

      
    });

    console.log(rankedUsers)
    //doc.map((document) => {

    //});

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

async function getVariable() {
  return rankedUsers;
}

run()
module.exports = { getVariable };
