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
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", require("./src/routes"));


// Error validation
app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  res.status(500).json({ name, message, stack });
  next(err);
});

// Not found 404
app.use((req, res) => {
  res.status(404).send("Página não encontrada!")
})

// Settings
app.set("port", process.env.HTTPPORT || 80);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server is running ${app.get("port")}`);
});