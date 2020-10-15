const mongoose = require("mongoose");

const mongoURI = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@socialappcluster.eb9l8.mongodb.net/SocialAppCluster?retryWrites=true&w=majority`;

const connectDB = async function () {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Database has been connected");
  } catch (err) {
    console.log(err);

    //Want to program to exit if database couldn't be connected
    process.exit(1);
  }
};

module.exports = connectDB;
