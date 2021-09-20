const sql = require("./db.js");

const Genre = function(genre) {
    this.title_of_genre = genre.title_of_genre;
    this.style_of_genre = genre.style_of_genre;
};

Genre.create = (newGenre, result) => {
    sql.query("INSERT INTO genres SET ?", newGenre, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created genre: ", { id: res.insertId, ...newGenre });
        result(null, { id: res.insertId, ...newGenre });
    });
};

Genre.getAll = result => {
    sql.query("SELECT * FROM genres", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("genres: ", res);
        result(null, res);
    });
};

Genre.updateById = (id, genre, result) => {
    sql.query(
        "UPDATE genres SET title_of_genre = ?, style_of_genre = ? WHERE id = ?",
        [genre.title_of_genre, genre.style_of_genre, id],
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
            console.log("updated genre: ", { id: id, ...genre });
            result(null, { id: id, ...genre });
        }
    );
};
module.exports = Genre;