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
const supplierRouter = require("./routes/supplier.router");
const materialRouter = require("./routes/material.router");
const batchesRouter = require("./routes/batches.router");
const orderRouter = require("./routes/order.router");
const productRouter = require("./routes/product.router");
const productMaterialRouter = require("./routes/product_material.router");
const productBatchesRouter = require("./routes/product_batches.router");
const measurementRouter = require("./routes/measurement.router");
const jobRouter = require("./routes/job.router");

const { isAuth } = require("./middleware");

const app = express();

app.use(morgan("dev"));
app.use(corsConf);
// parse body middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// express-session middleware
app.use(sessionConf);

// passportJS middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", authRouter);

// protected routes
app.use("/api/user", isAuth, userRouter);
app.use("/api/business", isAuth, businessRouter);
app.use("/api/supplier", isAuth, supplierRouter);
app.use("/api/material", isAuth, materialRouter);
app.use("/api/batches", isAuth, batchesRouter);
app.use("/api/order", isAuth, orderRouter);
app.use("/api/product", isAuth, productRouter);
app.use("/api/product_material", isAuth, productMaterialRouter);
app.use("/api/measurement", isAuth, measurementRouter);
app.use("/api/product_batches", isAuth, productBatchesRouter);
app.use("/api/job", isAuth, jobRouter);

app.listen(5000, () => console.log("http://localhost:5000"));
