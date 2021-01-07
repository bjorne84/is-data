const express = require("express");
const router = express.Router();

// posts Model
const Posts = require("../../models/PostModel");

// routes, api/posts

router.post("/", async (req, res) => {
  console.log(req.body);
  const newIcePost = new Posts({
    lake: req.body.lake,
    text: req.body.text,
  });
  console.log(newIcePost);
  try {
    // spara i db
    const inPost = await newIcePost.save();
    // Koll om försöket blir falskt att spara i databasen
    if (!inPost) {
      res.status(503);
      throw Error("Something went wrong while saving the post =( ");
    } else {
      // It worked ok, post is created
      res.status(201).json(inPost);
    }
  } catch (err) {
    // dålig data in från användare = 400
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
