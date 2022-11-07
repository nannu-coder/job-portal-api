const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./DB/Connect");

//middleware
app.use(express.json());
app.use(cors());

//Routes Import
const jobroutes = require("./routes/job.route");

//Routes
app.use("/api/v1/job", jobroutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_LOCAL);
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
