const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

//express app
const app = express();

// connect to MongoDB
const dbURL = "mongodb+srv://andrew:andrew123@nodetuts.lks6onb.mongodb.net/"
mongoose.connect(dbURL)
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine

app.set('view engine', 'ejs');

//middleware and static files

app.use(express.static('public'));//an inbuilt express middleware function to access static files 
app.use(morgan('dev'));


// mongoose and sandbox routes
app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title:'new blog 2',
        snippet:'about my new blog',
        body:'more about my new blog'
    });

    blog.save()
    .then((result)=> {
        res.send(result)
    })
    .catch((err)=> {
        console.log(err);
    });
})



app.get('/all-blogs', (req,res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});


app.get('/single-blog', (req,res)=> {
    Blog.findById("646a12682bc80c4ec2189aa3")
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
})



app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    // res.send('<p> About </p>');
    // res.sendFile('./views/about.html', { root:__dirname });
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create Blog'});
})
   

//404 Page

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});//works like the default case...it's put in last to be the one that is carried out if a match is not found

