require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 4000;

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connect to Database");

    app.listen(PORT, () =>
      console.log(`The server has started on port ${PORT}`)
    );
  }
);
