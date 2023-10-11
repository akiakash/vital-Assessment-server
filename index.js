const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

const cors = require("cors");

app.use(cors());

var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    parameterLimit: 100000,
    extended: false,
  })
);

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);

app.get("/", (req, res) => {
  res.send("We are on Home");
});

const TodoManagement = require("./routers/TodoManagement");
const UserManagement = require("./routers/User");
const AuthManagement = require("./routers/Auth");
const TaskManagement = require("./routers/taskRoutes");
const TeamManagement = require("./routers/teamRoutes");

app.use("/todomanagement", TodoManagement);
app.use("/usermanagement", UserManagement);
app.use("/authmanagement", AuthManagement);
app.use("/taskmanagement", TaskManagement);
app.use("/teammanagement", TeamManagement);
// Make sure this code is inside an async function or an async route handler.
async function connectToMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://akash:Akiakash1@cluster0.bfppbit.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToMongoDB();

//Server host
app.listen(9999);
