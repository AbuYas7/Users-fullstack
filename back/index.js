const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.join(__dirname, "images")));
app.use(morgan("dev"));
app.use(require("./routes"));

mongoose
  .connect(process.env.CONNECT)
  .then(() => {
    console.log("connected");
    app.listen(port, () => {
      console.log(`server has been started on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
