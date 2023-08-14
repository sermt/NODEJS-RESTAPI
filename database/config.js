const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo");
  } catch (error) {
    throw new Error("Couldn't connect to Mongo'");
  }
};

module.exports = dbConnection;
