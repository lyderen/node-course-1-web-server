const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}--`;

  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('unable to append to server.log');
    }
  });
next();
});

app.use((req,res,next) =>{
  res.render('error.hbs');
});

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('GetFullYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
});

app.get('/',(req,res) =>{
   // res.send('<h1>helo levi im express  machine</h1>');
   res.send({
     name: 'levi',   like:['food','sex']});});

app.get('/home',(req,res) =>{
  res.render('home.hbs',{
    pageTitle: 'HOME',
    massege: ' WELCOM & happy hanuka'
  });
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle: 'ABOT PAGE',
    welcomeMasseg: 'welcome Abourd'
  });
});

app.listen(3000);
