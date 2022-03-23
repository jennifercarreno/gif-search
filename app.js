const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const fetch = require('node-fetch');
require('dotenv').config();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");
app.use(express.static('public'));

app.get('/', 
  (req, res) => {
    let term = "";
    if (req.query.term) {
      term = req.query.term
    }
    fetch(`https://g.tenor.com/v1/search?q=${term}&key=${process.env.API_KEY}&limit=10`)
    .then(response => response.json())
    .then(
      (data) => {
        const gifs = data.results;
        res.render('home', { gifs });
      }
    );
  }
);


app.listen(3000, 
    () => {
      console.log(`Gif Search listening on http://localhost:3000/`);
    }
  );