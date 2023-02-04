const { render } = require('ejs');
const express = require('express');
const router = express.Router();
//const Task = require('../model/task');
var Post = require('../model/Post');

router.get('/', async function(req,res){
  var posts = await Post.find();
  res.render('index', {posts});
});

router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.get('/edit/:id', async (req,res) =>{
  var id = req.params.id;
  var post = await Post.findById(id);
  res.render('edit', {post});
});

router.get('/delete/:id', async (req,res) =>{
  var id = req.params.id;
  var post = await Post.findById(id);
  res.render('delete', {post});
});

router.get('*', async function(req,res){
  res.redirect('/');
});

router.post('/newPost', async (req,res) =>{
  var post = new Post({
    title: req.body.title,
    author: req.body.author,
    post_date: req.body.post_date,
    post_data: req.body.post_data
  });

  post.save((err, document) => {
    if (err)
    {
        console.log(err);
        return;
    }
  });

  res.redirect('/');
});

router.post('/edit/:id', async (req,res) =>{
  var id = req.params.id;
  await Post.updateOne({_id: id}, req.body);
  res.redirect("/");
});

router.post('/delete/:id', async (req,res) =>{
  var id = req.params.id;
  await Post.deleteOne({_id: id});
  res.redirect("/");
});

module.exports = router;