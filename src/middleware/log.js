require("dotenv").config();
const path = require("path");
const winston = require("winston");
const { combine, printf, label, timestamp } = winston.format;
const { SqlTransport } = require("winston-sql-transport");

const log = () => {
  const transportConfig = {
    client: "mssql",
    connection: {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_HOST,
      database: process.env.DB_NAME,
    },
    // defaultMeta: { example_winston_logs: true },
    name: "LogViliveWay",
    tableName: "logs",
  };

  const listLogLevel = ["silly", "info", "error", "degub"];

  global.logger = winston.createLogger({
    level: logLevel,
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(__dirname, "../log/vileve-way.log"),
      }),
      new SqlTransport(transportConfig),
    ],

    format: combine(
      label({ label: "vileve-way" }),
      timestamp(),

      //   appendTimestamp({ tz: "Asia/Taipei" }),
      printf(({ level, message, label, timestamp }) => {
        const newDate = new Intl.DateTimeFormat("fr-CA", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(timestamp));
        return `${newDate} [${label}] ${level}: ${message}`;
      })
    ),
  });
};

const logMiddleware = () => {
  return (req, res, next) => {
    const transportConfig = {
      client: "mssql",
      connection: {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
      },
      // defaultMeta: { example_winston_logs: true },
      name: "LogViliveWay",
      tableName: "logs",
    };

    global.logger = winston.createLogger({
      level: logLevel,
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join(__dirname, "../log/vileve-way.log"),
        }),
        new SqlTransport(transportConfig),
      ],

      format: combine(
        label({ label: "vileve-way" }),
        timestamp(),
        printf(({ level, message, label, timestamp }) => {
          const newDate = new Intl.DateTimeFormat("fr-CA", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }).format(new Date(timestamp));
          return `${newDate} [${label}] ${level}: ${message}`;
        })
      ),
    });
    next();
  };
};

module.exports = {
  log,
  logMiddleware,
};
