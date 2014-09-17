var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.json({
    msg: "Hello. This is a simple JSON database."
  });
});

app.route('/:name')
  
  .post(function (req, res) {
    var info = "Saved name is: " + req.params.name;
    fs.writeFile('output/name.json', JSON.stringify(info));
    res.send("Saving name " + req.params.name + " to file output/name.json");
  })

  .get(function (req, res) {
    var scan = fs.readFileSync('output/name.json', 'utF8');
    var result = JSON.parse(scan);
    res.json(result);
  });

app.listen(port);
console.log("Server running on " + port);
