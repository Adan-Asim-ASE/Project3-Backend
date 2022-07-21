require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const posts = require('./routes/posts.routes');
const users = require('./routes/users.routes');
// db.sequelize.sync({ force: true }).then(() => { console.log( "Drop and re-sync db.");});
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', users);
app.use('/posts', posts);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
