const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');

const app = express();
const urlencondeParser = bodyParser.urlencoded({extended: false});
const sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306
});

sql.query("use crudnodejs");


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

// insert routes
app.get("/inserir", function(req, res) {
  res.render("inserir");
});

app.post("/controllerForm", urlencondeParser, function(req, res){
  sql.query("insert into user values (?, ?, ?)", [req.body.id, req.body.name, req.body.age]);
  res.render("controllerForm", {name: req.body.name});
});

// select routes
app.get("/select/:id?", function(req, res) {
  if(!req.params.id) {
    sql.query("select * from user order by id asc", function(err, results, fields) {
      res.render("select", { data:results });
    });
  } else {
    sql.query("select * from user where id = ? order by id asc", [req.params.id], function(err, results, fields) {
      res.render("select", { data:results });
    });
  }
});

// delete routes
app.get("/deletar/:id", function(req, res) {
  sql.query("delete from user where id = ?", [req.params.id]);
  res.render("deletar");
});

// start server
app.listen(3000, function(req, res) {
  console.log('Servidor está rodando');
});