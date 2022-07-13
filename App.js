const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
const posts = require('./routes/posts.routes');
const users = require('./routes/users.routes');
const jwt = require("jsonwebtoken");

require('dotenv').config();

// db.sequelize.sync({ force: true }).then(() => {          
//     console.log( "Drop and re-sync db.");
// }); 

var corsOptions = {
  origin: "http://localhost:3000"
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

