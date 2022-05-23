const { password } = require("pg/lib/defaults");
const db = require("../models");
const users = db.users;
const posts = db.posts;

exports.createUser = (req, res) => {
    if ((!req.body)) {
        req.status(400).send({
            message: "User cannot be empty"
        });
        return;
    }
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    users.create(user)
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

exports.createPost = (req, res) => {
    if ((!req.body)) {
        req.status(400).send({
            message: "Post cannot be empty"
        });
        return;
    }
    const post = {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
        userId: req.params.id,
    }
    posts.create(post)
        .then((post) => {
            res.send(post);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};


exports.findUser = (req, res) => {
    const name = req.params.name;
    const password = req.body.password;

    users.findAll({ where: { name: name, password: password } })
        .then((user) => {
            if (user != undefined) {
                res.send(user);
            }
            else {
                res.status(404).send({
                    message: "Cannot find user with name=" + name + " and password=" + password
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving user with name=" + name + " and password=" + password
            });
        });
};

exports.findAllPostsByUserId = (req, res) => {
    const id = req.params.id;
    posts.findAll({ where: { userId: id } })
        .then((post) => {
            if (post) {
                res.send(post);
            }
            else {
                res.status(404).send({
                    message: 'Cannot find any post with UserId=' + id
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving posts with Userid=" + id
            });
        });
};

exports.findPublishedPostsByUserId = (req, res) => {
    const id = req.params.id;
    posts.findAll({ where: { userId: id, published: true } })
        .then((post) => {
            if (post) {
                res.send(post);
            }
            else {
                res.status(404).send({
                    message: 'Cannot find any published post by User No: ' + id
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving posts with Userid=" + id
            });
        });
};

exports.findDraftedPostsByUserId = (req, res) => {
    const id = req.params.id;
    posts.findAll({ where: { userId: id, published: false } })
        .then((post) => {
            if (post) {
                res.send(post);
            }
            else {
                res.status(404).send({
                    message: 'Cannot find any drafted post with by User No: ' + id
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving posts with Userid=" + id
            });
        });
};


exports.DeletePost = (req, res) => {
    const pid = req.params.id;
    posts.destroy({ where: { id: pid } })
        .then((post) => {
            if (post == 1) {
                res.send("Post deleted successfully");
            }
            else {
                res.status(404).send({
                    message: 'Cannot find any post with id= ' + pid
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving posts with id= " + pid
            });
        });
};

exports.UpdatePost = (req, res) => {
    const id = req.params.id;
    posts.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Post updated Successfully" });
            }
            else {
                res.send({ message: "Cannot update post with given id" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error in updating given post" });
        });
}
