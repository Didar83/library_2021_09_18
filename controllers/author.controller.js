const Author = require("../model/authors.model");
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const author = new Author({
        name: req.body.name,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
    });

    Author.create(author, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the author."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Author.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving author."
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Author.updateById(
        req.params.id,
        new Author(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found author with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating author with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};