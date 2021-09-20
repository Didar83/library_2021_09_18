const Book = require("../model/books.model");
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const book = new Book({
        author_id: req.body.author_id,
        genre_id: req.body.genre_id,
        title: req.body.title,
        pages_quantity: req.body.pages_quantity,
        date_of_publication: req.body.date_of_publication
    });

    Book.create(book, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Book."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Book.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
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
    Book.updateById(
        req.params.id,
        new Book(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found book with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating book with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};