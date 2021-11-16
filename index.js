const express = require("express");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./src/swagger/swagger_output.json')
const swaggerFilePublic = require('./src/swagger/public/swagger_output.json')
// Express: Facto standard server framework for Node.js
const app = express();
// Cors habilited Cross-origin resource sharing
const cors = require("cors");
// Morgan is used for logging request details;
const morgan = require("morgan");
// BodyParser formated request body
const bodyParser = require("body-parser");
// logs
const { log, logMiddleware } = require("./src/middleware/log");
global.logLevel = "error";

// Middlewares: functions run before of create routes
log();
app.use(logMiddleware());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Create swagger
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/api/v1/public', swaggerUi.serve, swaggerUi.setup(swaggerFilePublic))

// app.use(function (req, res, next) {
//   res.setHeader("Cache-Control", "max-age=15, public");
//   res.setTimeout(50000, () => {
//     console.log("Request has timed out.");
//     res.status(408).send({ name: "error", message: "Request has timed out" });
//   });
//   next();
// });

// log();

// Routes
app.use("/api/v1", require("./src/routes"));

// Error validation
app.use((err, req, res, next) => {
  const { name, message, stack, details, status } = err;
  logger.error(`Message: ${message}\n stack: ${stack}`);
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
  logger.error("Rota não encontrada!");
  res.status(404).send("Rota não encontrada!");
});

// Settings
app.set("port", process.env.HTTPPORT || 80);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server is running ${app.get("port")}`);
  logger.info(`Server is running ${app.get("port")}`);
});

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });
