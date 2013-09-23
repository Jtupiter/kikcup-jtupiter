var express = require('express'),
    mongojs = require('mongojs'),
    app = express(),
    server = require('http').createServer(app);

server.listen(process.env.PORT || 5000);

app.use(express.bodyParser());
app.use(express.static(__dirname + '/web'));

var mongoUrl = process.env.MONGOHQ_URL || 'mongodb://jtupiter:jtupiter@paulo.mongohq.com:10083/app18202185';
var collections = ["users", "groups"]
var db = mongojs.connect(mongoUrl, collections);

// Needed to have an incrementing index for each database
function insertDocument(doc, targetCollection, callback) {
    var cursor = targetCollection.find( {}, {_id: 1}).sort({_id: -1}).limit(1);
    cursor.toArray(function(err, docs){
        if (docs == false){
            var seq = 1;
        }
        else {
            var seq = docs[0]._id + 1;
        }
        doc._id = seq;

        targetCollection.insert(doc);
        var new_document = doc;
        callback(new_document);
    });
}

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/user/:username', function(req, res){
    db.users.find({name: req.params.username}, function(err, users){
        user = users[0]
        if (!user){
            insertDocument({name:req.params.username, groups:[]}, db.users, function(doc){
                res.send(doc);
            });
        }
        else {
            res.send(user);
        }
    });
});

app.post('/user/:username', function(req, res){
    db.users.findAndModify({
        query: {name: req.params.username, groups: {$not: {$elemMatch: { id: +req.body.id }}}},
        update: {$push: {groups: {id: +req.body.id, name: req.body.group}}},
        new: true
    }, function(err, user) {
        res.send(user);
    });
});

app.get('/group/:id', function(req, res){
    db.groups.find({_id: +req.params.id}, function(err, groups){
        res.send(groups[0]);
    });
});

app.post('/group/:id', function(req, res){
    db.groups.findAndModify({
        query: {_id: +req.params.id},
        update: {$push: {photos: req.body.photo}},
        new: true
    }, function(err, group) {
        res.send(group);
    });
});

app.post('/newgroup/', function(req, res){
    insertDocument({name:req.body.name, photos:[]}, db.groups, function(doc){
        res.send(doc); 
    });
});