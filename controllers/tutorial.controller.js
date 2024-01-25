const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

//Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate Request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save the tutorial in the database
    Tutorial.create(tutorial)
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured with credentials"
            });
        })
};

//Retreive all tutorials from database
exports.findAll = (req, res) => {
    const title = req.body.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retreiving tutorials"
            });
        })

};

//Find a single tutorial with an id
exports.findOne = (req, res) => {
    const id = parseInt(req.params.id);

    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find tutoral with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retreiving tutorial with id=" + id
            });
        })
};

//Update a tutorial by the id in the request
exports.update = (req, res) => {
    const id = parseInt(req.params.id);

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial updated successfully!"
                })
            } else {
                res.send({
                    message: `Cannot update the tutorial with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating tutorial with id=" + id
            });
        })
};

//Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete the tutorial with id=${id}. Maybe Tutorial was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Cannot delete tutorial with id=" + id
            });
        })
};

//Delete all Tutorial from the database
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        turncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials deleted successfully` })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        })
};

//CFind All published Tutorial
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({
        where: { published: true }
    }).then(data => {
        res.send(data);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retreiving all tutorials."
        });
    })
};
