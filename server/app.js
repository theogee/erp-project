require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

const sessionConf = require("./conf/session.conf");
require("./conf/passport.conf");

const authRouter = require("./routes/auth.router");

const app = express();

app.use(morgan("dev"));

// express-session middleware
app.use(sessionConf);
// passportJS middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", authRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5000, () => console.log("http://localhost:5000"));
