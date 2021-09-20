const Genre = require("../model/genres.model");
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const genre = new Genre({
        title_of_genre: req.body.title_of_genre,
        style_of_genre: req.body.style_of_genre,
    });

    Genre.create(genre, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the genre."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Genre.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving genre."
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
    Genre.updateById(
        req.params.id,
        new Genre(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found genre with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating genre with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};