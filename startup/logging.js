const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  winston.configure({
    transports: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      new winston.transports.File({
        filename: "logfile.log",
        level: "info",
        format: winston.format.json()
      }),
      new winston.transports.MongoDB({
        db: "mongodb://localhost/wedding",
        level: "info",
        format: winston.format.json()
      })
    ]
  });

  winston.exceptions.handle(
    new winston.transports.File({
      filename: "./uncaughtException.log"
    })
  );

  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
