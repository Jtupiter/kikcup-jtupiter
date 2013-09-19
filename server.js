var express = require('express'),
    mongojs = require('mongojs'),
    app = express(),
    server = require('http').createServer(app);

server.listen(process.env.PORT || 5000);

app.use(express.static(__dirname + '/web'));

var mongoUrl = process.env.MONGOHQ_URL || "mongodb://jtupiter:jtupiter@paulo.mongohq.com:10072/app18070711";
var db = mongojs.connect(mongoUrl);

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/user/:username', function(req, res){
    user = db.users.find({name:req.params.username})
    if (!user){
        db.collection('users').save({name:req.params.username}, function(err, doc){
            user = doc;
        });
    }
    res.send(user);
});