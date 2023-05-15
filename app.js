const express = require('express');

//express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p> HomePage </p>');
    res.sendFile('./views/index.html', { root:__dirname });
});

app.get('/about', (req, res) => {
    // res.send('<p> About </p>');
    res.sendFile('./views/about.html', { root:__dirname });
});

//redirects

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//404 Page

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root:__dirname })
});//works like the default case...it's put in last to be the one that is carried out if a match is not found
