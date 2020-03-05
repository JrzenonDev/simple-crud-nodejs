const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');

const app = express();

//template engine
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// css, js and img
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));


// routes and template
app.get("/", function(req, res) {
  // ?: torna o id opcional
  //res.send("Essa é minha página inicial");
  //res.sendFile(__dirname+"/index.html");
  res.render('index');
});

// start server
app.listen(3000, function(req, res) {
  console.log('Servidor está rodando');
});