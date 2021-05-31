const express = require("express");
// Express: Facto standard server framework for Node.js
const app = express();
// Cors habilited Cross-origin resource sharing
var cors = require('cors');
// Morgan is used for logging request details;
const morgan = require("morgan");
// BodyParser formated request body
const bodyParser = require("body-parser");

// Middlewares: functions run before of create routes
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

<<<<<<< HEAD
Routes
app.use("/", (req, res) => {
    res.send("Hello Lucas")
});

// require('./app/routes')(app)
=======
// Routes
app.use("/", require("./src/routes"));

// Settings
app.set("port", process.env.HTTPPORT || 3000);
>>>>>>> e99ea18185f58c1196af82bbfad5a46e6fc150d5

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server is running ${app.get("port")}`);
});