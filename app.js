const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');

const app = express();

//template engine
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes and template
app.get("/:id?", function(req, res) {
  // ?: torna o id opcional
  //res.send("Essa é minha página inicial");
  //res.sendFile(__dirname+"/index.html");
  res.render('index', {id:req.params.id});
});

// start server
app.listen(3000, function(req, res) {
  console.log('Servidor está rodando');
});