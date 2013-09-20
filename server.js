var express = require('express'),
    mongojs = require('mongojs'),
    app = express(),
    server = require('http').createServer(app);

server.listen(process.env.PORT || 5000);

app.use(express.static(__dirname + '/web'));

var mongoUrl = process.env.MONGOHQ_URL || "mongodb://localhost";
var db = mongojs.connect(mongoUrl);

// Needed to have an incrementing index for each database
function insertDocument(doc, targetCollection) {

    while (1) {

        var cursor = targetCollection.find( {}, { _id: 1 } ).sort( { _id: -1 } ).limit(1);

        var seq = cursor.hasNext() ? cursor.next()._id + 1 : 1;

        doc._id = seq;

        targetCollection.insert(doc);

        var err = db.getLastErrorObj();

        if( err && err.code ) {
            if( err.code == 11000 /* dup key */ )
                continue;
            else
                print( "unexpected error inserting data: " + tojson( err ) );
        }

        return doc;
    }
}

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/user/:username', function(req, res){
    user = db.users.find({name:req.params.username})
    if (!user){
        user = insertDocument({name:req.params.username}, db.users);
    }
    res.send(user);
});

app.post('/user/:username', function(req, res){
    user = db.users.update({name:req.params.username}, {$push: {groups: req.body['group']}})
    res.send(user);
});

app.post('/group/:id', function(req, res){
    if (!req.params.id){
        group = insertDocument({name:req.body['name']}, db.groups);
    }
    else {
        group = db.groups.update({_id:req.params.id}, {$push: {photos: req.body['photo']}})
    }
    res.send(group);
});