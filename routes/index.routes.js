const express = require('express');
const router = express.Router();
const app = express();

const usersRoutes = require('./users.routes')
const postsRoutes = require('./posts.routes')

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

module.exports = router;