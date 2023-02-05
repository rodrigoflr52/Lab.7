const express = require("express");
const router = express.Router();
let PostModel = require=("/model/post")
//const Task = require('../model/task');

router.get("/", async function (req, res) {
  let posts = await PostModel.find();
  res.render("index", { posts });
});

router.get("/newPost", async (req, res) => {
  res.render("newPost");
});

router.post("/newPost", async (req, res) => {
  try {
    let NewPost = new PostModel({
      title: req.body.title,
      author: req.body.author,
      post_data: req.body.post_data,
      post_date: Date.now(),
    });

    const data = await NewPost.save();
    console.log("Saved: ", data);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.get("/edit/:id", async (req, res) => {
  let post = await PostModel.findById(req.params.id);
  res.render("edit", { post });
});

router.post("/edit/:id", async (req, res) => {
  await PostModel.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    author: req.body.author,
    post_data: req.body.post_data,
  });
  console.log("updated");
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  let post = await PostModel.findById(req.params.id);
  res.render("delete", { post });
});

router.post("/delete/:id", async (req, res) => {
  await PostModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;