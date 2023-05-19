const express = require('express');

//express app
const app = express();

//register view engine

app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p> HomePage </p>');
    // res.sendFile('./views/index.html', { root:__dirname });
    res.render('index');
});

app.get('/about', (req, res) => {
    // res.send('<p> About </p>');
    // res.sendFile('./views/about.html', { root:__dirname });
    res.render('about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create');
})
   

//404 Page

app.use((req, res) => {
    res.status(404).render('404');
});//works like the default case...it's put in last to be the one that is carried out if a match is not found

