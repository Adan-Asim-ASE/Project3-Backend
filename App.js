const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
const usersRoutes = require('./routes/users.routes')
const postsRoutes = require('./routes/posts.routes')

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

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

