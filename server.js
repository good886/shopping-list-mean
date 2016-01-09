// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
// we can also provide some credentials
var db = mongojs('user:user123@ds037175.mongolab.com:37175/shoppinglist', ['shoppinglist'])

//var db = mongojs('shoppinglist', ['shoppinglist']);
var bodyParser = require('body-parser');

// configuration ===========================================
  
// config files
//var db = require('./config/db');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/shoppinglist', function (req, res) {
  console.log('I received a GET request');

  db.shoppinglist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/shoppinglist', function (req, res) {
  console.log(req.body);
  db.shoppinglist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/shoppinglist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.shoppinglist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/shoppinglist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.shoppinglist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/shoppinglist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.shoppinglist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, market1: req.body.market1, market2: req.body.market2, market3: req.body.market3, price: req.body.price, price1: req.body.price1, price2: req.body.price2}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
app.set('port', (process.env.PORT || 3000))
console.log("Server running on port 3000");