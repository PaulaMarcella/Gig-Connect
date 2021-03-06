"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");

const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const eventsRouter = require("./routes/event");
const userRouter = require("./routes/user");
const hbs = require("hbs");

const app = express();

// Setup view engine
app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerHelper("ifCreator", function(user, event, options) {
  return JSON.stringify(user._id) == JSON.stringify(event.creator._id)
    ? options.fn(this)
    : options.inverse(this);
});

hbs.registerHelper("ifAttending", function(user, event, options) {
  return user.eventsAttending.includes(event._id)
    ? options.fn(this)
    : options.inverse(this);
});
hbs.registerHelper("ifNotAttending", function(user, event, options) {
  return !user.eventsAttending.includes(event._id)
    ? options.fn(this)
    : options.inverse(this);
});

app.use(express.static(join(__dirname, "public")));
app.use(
  sassMiddleware({
    src: join(__dirname, "public"),
    dest: join(__dirname, "public"),
    outputStyle:
      process.env.NODE_ENV === "development" ? "nested" : "compressed",
    sourceMap: true
  })
);

app.use(logger("dev"));
app.use(express.json());
//This is what allows you to acces the body ↓
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    })
  })
);

// Custom piece of middleware
app.use((req, res, next) => {
  // Access user information from within my templates
  res.locals.user = req.session.user;
  // Keep going to the next middleware or route handler
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", eventsRouter);
app.use("/", userRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.render("error");
});

module.exports = app;
