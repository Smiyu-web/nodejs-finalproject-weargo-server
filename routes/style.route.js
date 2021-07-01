const router = require("express").Router();
const multer = require("multer");
const Style = require("../models/style.model");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "/uploads/images");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// const upload = multer({ dest: __dirname + "/uploads/" });
const upload = multer({
  dest: __dirname + "../../../frontend/public/uploads",
});

router.get("/", async (req, res, next) => {
  try {
    const style = await Style.find();
    res.status(200).json(style);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post("/add-style", upload.single("image"), async (req, res, next) => {
  try {
    let { title, season, weather, userId, tags, likeCount, image } = req.body;
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
      image: req.file.originalname,
      likeCount: likeCount,
    });
    const savedStyle = await newStyle.save();
    res.json({ msg: "Added new style", savedStyle });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/likePost", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const style = await Style.findById(id);

    const updateStyle = await Style.findByIdAndUpdate(
      id,
      { likeCount: style.likeCount + 1 },
      { new: true }
    );

    res.json(updateStyle);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
