var express = require('express');
var mustache = require('mustache');
var session = require('express-session');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
  secret: 'Silsin',
  resave: false,
  saveUninitialized: true
}))

app.get('/login', function(req, res){
  session = req.session;
  if(session.uniqueID) {
    res.redirect('/redirects');
  }
  res.sendFile('./Login/log.html', {root: __dirname});
});

app.post('/login', function(req, res){
  //res.end(JSON.stringify(req.body));
  session = req.session;
  if(session.uniqueID) {
    res.redirect('/redirects')
  }
  if(req.body.username == 'admin' && req.body.password == 'admin'){
    session.uniqueID = req.body.username;
  }
  res.redirect('/redirects');
});

app.get('/logout', function(req, res){
  req.session.destroy(function(error){
    console.log(error);
    res.redirect('/login');
  })
});

app.get('/admin', function(req, res){
  session = req.session;
  if(session.uniqueID != 'admin') {
    res.send('No Play Son');
  }
  res.send('King Me!');
})

app.get('/redirects', function(req, res){
  if(session.uniqueID == 'admin') {
    console.log(session.uniqueID);
    res.redirect('/admin');
  } else {
    res.send('Who Dat? <a href="/logout">END THIS NOW</a>');
  }
})

app.listen(3000, function(){
  console.log('Listening at Port 3000');
});
