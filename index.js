  
const express = require("express");
const app = express();
var cors = require('cors');
const bodyParser = require("body-parser");


app.use((req, response, next) => {
  
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  app.use(cors());
  next();
});

// All OPTIONS requests return a simple status: 'OK'
app.options('*', (req, res) => {
  res.json({
    status: 'OK'
  });
});

// Settings
app.set("port", process.env.PORT || 3001);

// Middlewares: functions run before of create routes
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/", (req, res) => {
    res.send("Hello World: vileve!")
});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Serve on port ${app.get("port")}`);
});