module.exports = app => {
    const author = require("../controllers/author.controller.js");

    app.post("/authors", author.create);

    app.get("/authors", author.findAll);

    app.put("/authors/:id", author.update);
};