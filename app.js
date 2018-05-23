const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + "/views/style"));
app.use(express.static(__dirname + "/public"));


app.get('/', function(req, res){
  res.render('home');
});


app.listen(3000);
console.log('Listening on port 3000');
