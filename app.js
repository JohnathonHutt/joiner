//jshint esversion:6

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get('/', function (req, res) {
   res.sendFile(__dirname + "/index.html");
 });

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});
