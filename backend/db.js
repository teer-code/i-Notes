const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appName=MongoDB%25Compass&directConnection=true&tls=false";
const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
      console.log("connected to server successfully");
    });
  };
module.exports = connectToMongo;