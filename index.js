const express = require("express");
// Express: Facto standard server framework for Node.js
const app = express();
// Cors habilited Cross-origin resource sharing
var cors = require("cors");
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
app.use(function (req, res, next) {
  res.setHeader("Cache-Control", "max-age=15, public");
  res.setTimeout(10000, () => {
    console.log("Request has timed out.");
    res.status(408).send({ name: "error", message: "Request has timed out" });
  });
  next();
});

// Routes
app.use("/api/v1", require("./src/routes"));

// Error validation
app.use((err, req, res, next) => {
  const { name, message, stack, details, status } = err;

  switch (status) {
    case 400:
      res.status(400).json({ name, message, details, stack });
      break;
    default:
      res.status(500).json({ name, message, details, stack });
  }
  next(err);
});

// Not found 404
app.use((req, res) => {
  res.status(404).send("Rota não encontrada!");
});

// Settings
app.set("port", process.env.HTTPPORT || 80);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server is running ${app.get("port")}`);
});
