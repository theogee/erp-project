require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

const sessionConf = require("./conf/session.conf");
require("./conf/passport.conf");
const corsConf = require("./conf/cors.conf");

const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const businessRouter = require("./routes/business.router");


const { isAuth } = require("./middleware");

const app = express();

app.use(morgan("dev"));

app.use(corsConf);

// express-session middleware
app.use(sessionConf);

// passportJS middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", authRouter);

// protected routes
app.use("/api/user", isAuth, userRouter);
app.use("/api/business", isAuth, businessRouter);


app.listen(5000, () => console.log("http://localhost:5000"));
