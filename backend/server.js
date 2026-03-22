const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db.js");
const routes = require("./routes/gamesRoutes.js");
const app = express();
const moment = require("moment");
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl}-${moment().format()}`,
  );
  next();
};
app.use(logger);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //this will allow us to read the URL body tags

//use routes
app.use("/api", routes);

//server listening
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
