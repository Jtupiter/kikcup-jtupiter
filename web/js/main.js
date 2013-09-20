(function (App) {
    /*cards.kik.getUser(function (user) {
        if ( !user ) {
            // user denied access to their information
            return;
        }
        $.get( "/user/" + user.username, function(data) {
            user_data = data;
        });
    });*/
    $.get( "/user/jtupiter", function(data) {
            user = data;
            console.log(user);
        });
    user = {
        id: 1, 
        name: "jtupiter", 
        groups:[{id: 1, name: "The Boys", photos:["url_boy1", "url_boy2"]}, {id: 2, name: "The Girls", photos:["url_girl1", "url_girl2"]}]}
    for (var i = 0; i < user.groups.length;i++){
        $('#group-edit-list').append('<li class="group" data-group="'+ user.groups[i].id +'">'+ user.groups[i].name +'</li>');
        $('#group-list').append('<li class="receiver" data-group="'+ user.groups[i].id +'">'+ user.groups[i].name +'</li>');
    }
    
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
            // PUSH PHOTOURL TO GROUP DATABASE
            var group_name = $(this).text();
            var group_id = $(this).data('group');
            App.load('groupphotos', { id : group_id, group_name : group_name });
        });
    });

    App.populator('view-groups', function (page) {
        $(page).on('click', '.group', function(){
            var group_name = $(this).text();
            App.load('groupphotos', { group_name : group_name });
        });

        $(page).on('click', '#add-new-group', function () {
            newgroupname = $(page).find('#new-group').val();
            // INITIALIZE GROUP IN DATABASE
            // ALSO ADD GROUP TO USER
            App.load('view-groups');
        });
    });

    App.populator('groupphotos', function (page, json) {
        $(page).find('.app-title').text(json.group_name);
        /*
        $.post( "/group/" + json.id, function(data) {
            user_data = data;
        });
        */
        // ASSUME I HAVE IMAGE ARRAY
        var imagearray = ['img/iphoto.jpg', 'img/iphoto.png', 'img/test1.jpg', 'img/test2.png'];
        for (var i = 0; i < imagearray.length; i++) {
            $(page).find('.app-content').append('<div class="groupphoto" image="' + imagearray[i] + '" style="background-image: url(\'' + imagearray[i] + '\'); background-size: 100%;"></div>');
        }
        $(page).on('click', ".groupphoto", function() {
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

    App.populator('photopage', function (page, json) {
        $(page).find('#pagephoto').attr('src', json.photo);
    });

    try {
        App.restore();
    } catch (err) {
        App.load('home');
    }  

    
})(App);
