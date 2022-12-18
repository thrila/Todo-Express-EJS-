const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path');
const Port = 8000;
const app = express();

var myTasks =['pray', 'Learn Japanese', 'eat'];


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname+"public"));
app.use(express.static(path.join(__dirname, 'public')));

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
var today = new Date();
var date = today.toLocaleDateString("en-US", options);
 

app.get("/", (req, res) => {
  res.render("index", { work: date, items: myTasks });
});

app.post("/", (req, res) => {
  const myTask = req.body.newTasks;
  myTasks.push(myTask)
  console.log(myTask);
  res.redirect("/");
});

app.listen(Port, () => {
  console.log(`Server running on port ${Port} ...`);
});
