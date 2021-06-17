const router = require("express").Router();
const bcrypt = require("bcryptjs"); // change password to #

const User = require("../models/user.model");

router.post("/signup", async (req, res, next) => {
  let { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ msg: "Not all fields have been entered" });
  }

  if (password.length < 5) {
    return res
      .status(400)
      .json({ msg: "The password needs to be at least 5 characters" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ msg: "An account with this email already exists." });
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    name: name,
    email: email,
    password: passwordHash,
  });

  const savedUser = await newUser.save();
  res.json({ msg: "Created new user", savedUser });
});

router.get("/", async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user) {
    res.json({ msg: "User doesn't exist" });
  }
  res.json({
    msg: "Hi there",
  });
});

module.exports = router;
