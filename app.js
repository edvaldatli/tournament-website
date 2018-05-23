const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const app = express();
const session = require('express-session');

const url = 'mongodb+srv://eddi:Banani123@tment-website-t3ivj.mongodb.net/test?retryWrites=true';
const dbName = 'test';

// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   db.collection('inserts').insertOne({a:"ewq"}, function(err, r) {
//     assert.equal(null, err);
//     assert.equal(1, r.insertedCount);
//
//     // Insert multiple documents
//     db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
//       assert.equal(null, err);
//       assert.equal(2, r.insertedCount);
//
//   client.close();
// });
// });
// });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3000/auth/steam/return',
  realm: 'http://localhost:3000',
  apiKey: 'F1DE8837610F314B271E73B78707B704'
},
  function(identifier, profile, done) {
      process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));




app.engine('handlebars', exphbs());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + "/views/style"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/lib"));
hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/account.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/partials');

// Routes

app.get('/', function(req, res){
  if(req.user !== undefined){
    res.locals = {
      userobj: req.user,
      avatar: req.user.photos[0].value,
      userid: req.user.id,
      userdisplayname: req.user.displayName,
    };
    }
    res.locals.newstitle = "Counter-Strike Mót";
    res.locals.newsdesc = "Counter-Strike mót fer að hefjast"
    res.render('home');
});
app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

  app.get('/account', ensureAuthenticated, function(req, res){
    if(req.user !== undefined){
    res.locals = {
      userobj: req.user,
      avatarmid: req.user.photos[2].value,
      avatar: req.user.photos[0].value,
      userid: req.user.id,
      userdisplayname: req.user.displayName
    };
  }
    res.render('account');
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
app.listen(3000);
console.log('Listening on port 3000');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
