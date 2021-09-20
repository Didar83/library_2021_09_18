const sql = require("./db.js");

// constructor
const Book = function(book) {
    this.author_id = book.author_id;
    this.genre_id = book.genre_id;
    this.title = book.title;
    this.pages_quantity = book.pages_quantity;
    this.date_of_publication = book.date_of_publication;
};

Book.create = (newBook, result) => {
    sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created book: ", { id: res.insertId, ...newBook });
        result(null, { id: res.insertId, ...newBook });
    });
};

Book.getAll = result => {
    sql.query("SELECT * FROM books", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("books: ", res);
        result(null, res);
    });
};

Book.updateById = (id, book, result) => {
    sql.query(
        "UPDATE books SET author_id = ?, genre_id = ?, title = ?, pages_quantity = ?, date_of_publication = ? WHERE id = ?",
        [book.author_id, book.genre_id, book.title, book.pages_quantity, book.date_of_publication, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found book with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated book: ", { id: id, ...book });
            result(null, { id: id, ...book });
        }
    );
};
module.exports = Book;