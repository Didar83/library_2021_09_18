const sql = require("./db.js");

const Author = function(author) {
    this.name = author.name;
    this.surname = author.surname;
    this.patronymic = author.patronymic;
    this.date_of_birth = author.date_of_birth;
    this.date_of_death = author.date_of_death;
};

Author.create = (newAuthor, result) => {
    sql.query("INSERT INTO authors SET ?", newAuthor, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created author: ", { id: res.insertId, ...newAuthor });
        result(null, { id: res.insertId, ...newAuthor });
    });
};

Author.getAll = result => {
    sql.query("SELECT * FROM authors", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("authors: ", res);
        result(null, res);
    });
};

Author.updateById = (id, author, result) => {
    sql.query(
        "UPDATE authors SET title_of_genre = ?, style_of_genre = ? WHERE id = ?",
        [author.title_of_genre, author.style_of_genre, id],
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
            console.log("updated author: ", { id: id, ...author });
            result(null, { id: id, ...author });
        }
    );
};
module.exports = Author;
