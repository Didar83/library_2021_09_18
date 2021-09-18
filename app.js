const express = require('express');
const app = express();
const port = 3000;
var indexRouter = require('./routes/index');
var postNewGenreRouter = require('./routes/postNewGenre');
var postNewAuthorRouter = require('./routes/postNewAuthor');
var postNewBookRouter = require('./routes/postNewBook');
var patchGenreRouter = require('./routes/patchGenre');
var patchAuthorRouter = require('./routes/patchAuthor');
var patchBookRouter = require('./routes/patchBook');
var getBooksListPDFRouter = require('./routes/getBooksListPDF');

app.listen(port, () =>{
    console.log('App running on port ${port}...');
});
app.use('/', indexRouter);
app.use('/new-genre', postNewGenreRouter);
app.use('/new-author', postNewAuthorRouter);
app.use('/new-book', postNewBookRouter);
app.use('/update-genre', patchGenreRouter);
app.use('/update-author', patchAuthorRouter);
app.use('/update-book', patchBookRouter);
app.use('/get-books-list-pdf', getBooksListPDFRouter);

// 404
app.use(function (req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

module.exports = app;