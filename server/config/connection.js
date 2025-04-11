const { connect, connection } = require("mongoose");
const mongoose = require("mongoose");

//connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zeouniversityhub');
mongoose.connect(
  "mongodb+srv://roopareddy:password1234@cluster0.gaxh4xl.mongodb.net/College?retryWrites=true&w=majority&appName=Cluster0"
);
module.exports = connection;
