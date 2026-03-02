require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger.middleware");
const context = require("./middlewares/request-context");
const auth = require("./middlewares/auth.middleware");
const version = require("./middlewares/version.middleware");
const routes = require("./routes/gateway.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);
app.use(context);
app.use(version);
app.use(auth);

app.use("/", routes);

app.use(errorHandler);

module.exports = app;