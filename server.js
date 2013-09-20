var express = require('express'),
    mongojs = require('mongojs'),
    app = express(),
    server = require('http').createServer(app);

server.listen(process.env.PORT || 5000);

app.use(express.static(__dirname + '/web'));

var mongoUrl = process.env.MONGOHQ_URL || 'mongodb://jtupiter:jtupiter@paulo.mongohq.com:10083/app18202185';
var collections = ["users", "groups"]
var db = mongojs.connect(mongoUrl, collections);

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
    db.users.find({name:req.params.username}, function(err, users){
        user = users[0]
        if (!user){
            user = insertDocument({name:req.params.username}, db.users);
        }
        res.send(user);
    });
});

app.post('/user/:username', function(req, res){
    db.users.update({name:req.params.username}, {$push: {groups: req.body['group']}}, function(err, users){
        res.send(users[0]);
    });
});

app.post('/group/:id', function(req, res){
    var group;
    if (!req.params.id){
        group = insertDocument({name:req.body['name']}, db.groups);
    }
    else {
        db.groups.update({_id:req.params.id}, {$push: {photos: req.body['photo']}}, function(err, groups){
            group = groups[0];
        })
    }
    res.send(group);
});

app.get('/group/:id', function(req, res){
    db.groups.find({_id: req.params.id}, function(err, groups){
        res.send(groups[0]);
    });
});