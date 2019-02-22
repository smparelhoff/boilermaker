const express = require("express");
const session = require("express-session");
const passport = require('passport')
const morgan = require("morgan");
const path = require("path");
//const bodyParser = require('body-parser')
const { db } = require("./database");

const app = express();

//Configure and create database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db }); 
dbStore.sync()

//Logging middleware
app.use(morgan("dev"));

//Static middleware
app.use(express.static(path.join(__dirname, "../public")));

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//Session middleware
app.use(
  session({
    //If an environment variable called SESSION SECRET exists, we put the secret on that instead of a string
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false
  })
);

//Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use("/api", require("./api"));
app.use("/auth", require("./auth"))


//Send index.html for all non-API requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public"));
});

//Handle 500 errors
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
