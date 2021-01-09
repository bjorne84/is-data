const express = require("express");
const router = express.Router();

// posts Model, the schema-model
const Posts = require("../../models/PostModel");

// **** POST ****, routes, api/posts
router.post("/", async (req, res) => {
  console.log(req.body);
  const newIcePost = new Posts({
    lake: req.body.lake,
    text: req.body.text,
  });
  console.log(newIcePost);
  try {
    // Save in DB
    const inPost = await newIcePost.save();
    // Check if it worked
    if (!inPost) {
      res.status(503);
      throw Error("Something went wrong while saving the post =( ");
    } else {
      // It worked ok, post is created
      res.status(201).json(inPost);
    }
  } catch (err) {
    // Bad data in from user = 400
    res.status(400).json({ msg: err.message });
  }
});

// **** GET ****, routes, api/posts
// Get all posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await Posts.find();
    if (!allPosts) {
      throw Error("No items found");
    } else {
      res.status(200).json(allPosts);
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// GET one post
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// UPDATE one post
router.patch("/:id", getPost, async (req, res) => {
  // options new = true makes mangoose send back updated data and not old
  let options = { new: true };
  try {
    const post = await Posts.findByIdAndUpdate(
      req.params.id,
      req.body,
      options
    );
    if (!post) {
      throw Error("Something went wrong while updating the post =( ");
    } else {
      // It worked ok, post is created
      res.status(201).json(post);
      console.log(post);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE one post
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.deleteOne();
    res.status(200).json({ message: "Success: Course is deleted!" });
  } catch (err) {
    res.status(503).json({ message: err.message });
  }
});

// Creating middlewhere function to re-use, findbyid. Middlewhere idé = webdev simplified
async function getPost(req, res, next) {
  let post;
  try {
    post = await Posts.findById(req.params.id);
    if (post == null) {
      return res
        .status(404)
        .json({ message: "Cant find any post with that ID" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

module.exports = router;
