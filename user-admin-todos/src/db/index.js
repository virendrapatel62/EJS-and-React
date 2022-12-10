const mongoose = require("mongoose");
module.exports.createConnection = () => {
  mongoose.connect("mongodb://localhost:27017/todos").then(() => {
    console.log("Mongo DB connected");
  });
};
