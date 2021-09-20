module.exports = app => {
    const genre = require("../controllers/genre.controller.js");

    app.post("/genres", genre.create);

    app.get("/genres", genre.findAll);

    app.put("/genres/:id", genre.update);
};