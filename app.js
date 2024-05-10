const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const Tasks = require("./routes/task");
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("db not connected");
  });

app.use(bodyparser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());
app.use("/api", Tasks);
const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
