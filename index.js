  
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

<<<<<<< HEAD
Routes
app.use("/", (req, res) => {
    res.send("Hello Lucas")
});

// require('./app/routes')(app)
=======
// Routes
<<<<<<< HEAD
app.use("/", require("./src/routes"));

// Settings
app.set("port", process.env.HTTPPORT || 3000);
>>>>>>> e99ea18185f58c1196af82bbfad5a46e6fc150d5
=======
app.use("/", (req, res) => {
    res.send("Hello World Vileve!")
});
>>>>>>> b2b64a439d9b3ae8ac6f168e94ab2f0fe41c4d81

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Serve on port ${app.get("port")}`);
});