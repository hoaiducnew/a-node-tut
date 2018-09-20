const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", (req, res, next) => {
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
