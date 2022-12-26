const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Port = 8000;
const app = express();

// var myTasks =[];
mongoose.connect("mongodb://localhost:27017/todoListDB");
mongoose.set("strictQuery", true);
const tasksSchema = new Schema({ name: String });
const Task = mongoose.model("Task", tasksSchema);

const item1 = new Task({
  name: "to add task ",
});
const item2 = new Task({
  name: "write inn the provided space",
});
const item3 = new Task({
  name: "and click enter",
});
const defaultTask = [item1, item2, item3];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname+"public"));
app.use(express.static(path.join(__dirname, "public")));

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
var today = new Date();
var date = today.toLocaleDateString("en-US", options);

app.get("/", (req, res) => {
  Task.find({}, (err, myTasks) => {

    if (defaultTask.length === 0) {
      Task.insertMany(defaultTask, (err) => {
        console.log(err);
      });
      res.redirect('/')
    } else {
      res.render("index", { work: date, items: myTasks });
    }
  });
});

app.post("/", (req, res) => {
  const myTask = req.body.newTasks;
  const item = new Task ({
    name: myTask
  });
item.save();
  res.redirect("/");
});

app.post('/delete', (req,res)=> {
  const checkedItemId = req.body.checkBox;
  Task.findByIdAndRemove(checkedItemId, (err)=> {
    console.log('succesfully deleted item from db');
  })
  res.redirect('/')
})

app.listen(Port, () => {
  console.log(`Server running on port ${Port} ...`);
});
