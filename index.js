const express = require('express');

const postRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);

server.listen(5002, () => {
  console.log('\n*** Server Running on http://localhost:5002 ***\n');
});