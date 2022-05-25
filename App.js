const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
const controller = require("./controllers/All.controller.js");

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
// db.sequelize.sync({ force: true }).then(() => {
//     console.log( "Drop and re-sync db.");
// }); 


app.post("/CreateUser", controller.createUser);
app.get("/CheckUser/:email", controller.findUser);

app.post("/CreatePost/:id", controller.createPost);
app.get("/AllPostsByUser/:id", controller.findAllPostsByUserId);
app.get("/PublishedPostsByUser/:id", controller.findPublishedPostsByUserId);
app.get("/DraftedPostsByUser/:id", controller.findDraftedPostsByUserId);
app.delete("/DeletePost/:id", controller.DeletePost);
app.post("/UpdatePost/:id", controller.UpdatePost);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

