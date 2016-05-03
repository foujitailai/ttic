var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(function(req, res, next){
  res.set('Content-Type', 'application/json');
  next();
});


app.get('/tests', function(req, res){
  fs.readFile(__dirname + '/data/tests.json', 'utf8', function(err, data){
    if (err){
      res.status(500).end();
      return console.log(err);
    }
    res.status(200).send(data);
  })
});

// create
app.post('/tests', function(req, res){
  fs.readFile(__dirname + '/data/tests.json', 'utf8', function(err, data){
    if (err){
      res.status(500).end();
      return console.log(err);
    }
    
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(err);
    }

    console.log(req.body);
    data.push(req.body.content);
    
    fs.writeFile(__dirname + '/data/tests.json', JSON.stringify(data), function(err){
      if (err){
        res.status(500).end();
        return console.log(err);
      }
      res.status(201).send(data);
    })
  })
});

// update
app.put('/tests:id', function(req, res){
  fs.readFile(__dirname + '/data/tests.json', 'utf8', function(err, data){
    if (err){
      res.status(500).end();
      return console.log(err);
    }
    
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(err);
    }

    data.forEach(function(note, index){
      if (node.id == req.params.id){
        data[index] = req.body;
      }
    });
    
    fs.writeFile(__dirname + '/data/tests.json', JSON.stringify(data), function(err){
      if (err){
        res.status(500).end();
        return console.log(err);
      }
      res.status(200).send(data);
    })
  })
});

// delete
app.delete('/tests:id', function(req, res){
  fs.readFile(__dirname + '/data/tests.json', 'utf8', function(err, data){
    if (err){
      res.status(500).end();
      return console.log(err);
    }
    
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(err);
    }

    var targetIndex = -1;
    data.forEach(function(note, index){
      if (node.id == req.params.id){
        targetIndex = index;
      }
    });
    
    if (targetIndex >= 0){
      data.splice(targetIndex, 1);
    }
    
    fs.writeFile(__dirname + '/data/tests.json', JSON.stringify(data), function(err){
      if (err){
        res.status(500).end();
        return console.log(err);
      }
      res.status(204).send(data);
    })
  })
});


app.listen(3001, function(){
  console.log('Server started. Open http://localhost:3001 in your browser.');
});