const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/post');

const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://aviall:1q2w3e4r@cluster0-w7dan.mongodb.net/mean-tut?retryWrites=true")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.error('Cannot connect to database!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "123456",
      title: "First post",
      content: "This is the first post coming from the server."
    },
    {
      id: "123457",
      title: "Second post",
      content: "This is the second post coming from the server."
    }
  ];

  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

app.use((req, res, next) => {
  res.send('Hello from express!');
});

module.exports = app;
