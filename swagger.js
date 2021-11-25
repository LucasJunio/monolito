require("dotenv").config();
const { definitions } = require("./src/swagger/definitions");
const swaggerAutogen = require("swagger-autogen")();

// console.log(Signin);
const doc = {
  info: {
    version: "1.0.0",
    title: "Vileve Way Documentation - DEV",
    description: "Documentation to vileve way shopkeeper and admin",
  },
  host: process.env.ENDPOINT_SWAGGER,
  basePath: "/",
  schemes: ["https", "http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Log",
      description: "Endpoints",
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "Authorization", // name of the header, query parameter or cookie
      description: "Authorization: Bearer {{token}}",
    },
  },
  definitions,
};

const outputFile = "./src/swagger/swagger_output.json";
const endpointsFiles = ["./src/routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./src/routes/index.js"); // Your project's root file
});
