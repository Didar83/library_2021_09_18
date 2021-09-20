const express = require('express');
const app = express();
require("./routes/book.routes.js")(app);
require("./routes/genre.routes.js")(app);
require("./routes/author.routes.js")(app);
const pdf = require('html-pdf');

const port = 3000;
app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.render('pages/mainPage');
});

app.listen(port, () =>{
    console.log(`App running on port ${port}`);
});
module.exports = app;