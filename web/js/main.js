(function (App) {
    /* RECEIVING A GROUP INVITATION
    if (cards.kik.message) {
        // ADD GROUP (json passed in cards.kik.send) TO THE CURRENT USER IN MONGODB
        App.load('view-groups');
    }
    */



    /*cards.kik.getUser(function (user) {
        if ( !user ) {
            // user denied access to their information
            return;
        }
        $.get( "/user/" + user.username, function(data) {
            user_data = data;
        });
    });*/

    $.get("/user/jtupiter", function (data) {
        user = data;
    });
    
    App.populator('home', function (page) {
        $(page)
            .on('click', "#btn-cam", function(){
                cards.photo.get(function (photos) {
                    if (!photos) {

                    } else {
                        $('#photo').attr('src', photos[0]);
                    }
                })
            });
        $(page)
            .on('click', "#btn-post", function() {
                var photoUrl = $('#photo').attr('src');
                App.load('post-to-group', { photo : photoUrl });
            });
    });

    App.populator('post-to-group', function (page, json) {
        $(page).on('click', ".receiver", function(){
            var group_name = $(this).text();
            var group_id = $(this).data('group');
            $.post('/group/' + group_id, {photo: json.photo}, function(group){
                App.load('group-photos', $.parseJSON(group));
            });
        });
        for (var i = 0; i < user.groups.length; i++){
            $(page).find('#group-list').append('<li class="receiver" data-group="'+ user.groups[i].id +'">'+ user.groups[i].name +'</li>');
        }
    });

    App.populator('group-photos', function (page, json) {
        $(page).find('.app-title').text(json.name);
        var imagearray = json.photos;
        for (var i = 0; i < imagearray.length; i++) {
            $(page).find('.app-content').append('<div class="group-photo" image="' + imagearray[i] + '" style="background-image: url(\'' + imagearray[i] + '\'); background-size: 100%;"></div>');
        }

        $(page).on('click', ".group-photo", function() {
            var photoUrl = $(this).attr('image');
            App.load('photopage', { photo : photoUrl });
        });

        $(page).on('click', '#invite', function () {
            cards.kik.send({
                title : 'Photobook Invite' ,
                text : 'Join my Photobook group!' ,
                data: { some : 'json' }
            });
        });
    });

    App.populator('view-groups', function (page) {
        $(page)
            .on('click', ".group", function(){
                var group_id = $(this).data('group');
                $.get('/group/' + group_id, function(group){
                    App.load('group-photos', group);
                });
            });
        for (var i = 0; i < user.groups.length; i++){
            $(page).find('#group-edit-list').append('<li class="group" data-group="'+ user.groups[i].id +'">'+ user.groups[i].name +'</li>');
        }

        $(page).on('click', '#add-new-group', function () {
            newgroupname = $(page).find('#new-group').val();
            $.post("/newgroup/", {name: newgroupname}, function(group) {
                group = $.parseJSON(group);
                $(page).find('#new-group').val('');
                $(page).find('#group-edit-list').append('<li class="group" data-group="'+ group._id +'">'+ group.name +'</li>');
                $.post("/user/" + user.name, {id: group._id, group: group.name}, function(updated_user){user = $.parseJSON(updated_user);});
            });
        });

        $(page).on('click', '#edit', function () {

        });
    });

    App.populator('photopage', function (page, json) {
        $(page).find('#pagephoto').attr('src', json.photo);
    });

    try {
        App.restore();
    } catch (err) {
        App.load('home');
    }  

    
})(App);
