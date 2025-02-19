require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/model");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandingMiddleware");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
