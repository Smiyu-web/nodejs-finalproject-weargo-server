const router = require("express").Router();
const Style = require("../models/style.model");

router.post("/add-style", async (req, res, next) => {
  try {
    let { title, season, weather, userId, tags, likeCount } = req.body;
    console.log(req.body);
    if (!title) {
      return res.status(400).json({ msg: "Please fill out title" });
    }
    const newStyle = new Style({
      title: title,
      season: season,
      weather: weather,
      userId: userId,
      tags: tags,
      likeCount: likeCount,
    });
    const savedStyle = await newStyle.save();
    res.json({ msg: "Added new style", savedStyle });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
