require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/user.route");
const styleRoute = require("./routes/style.route");

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/users", userRoute);
app.use("/style", styleRoute);

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
