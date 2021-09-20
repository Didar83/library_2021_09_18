module.exports = app => {
    const books = require("../controllers/book.controller.js");

    // Create a new Book
    app.post("/books", books.create);

    // Retrieve all Books
    app.get("/books", books.findAll);

    // Update a Book with bookId
    app.put("/books/:id", books.update);
};