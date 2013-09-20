function PhotoBookCtrl($scope, $http) {
     /*cards.kik.getUser(function (user) {
        if ( !user ) {
            // user denied access to their information
            return;
        }
        else {
            $scope.user = $http.get('/user/' + user.username);
        }
    });*/
    mock_data = {
        id: 1, 
        name: "jtupiter", 
        groups:[{name: "The Boys", photos:["url_boy1", "url_boy2"]}, {name: "The Girls", photos:["url_girl1", "url_girl2"]}]}
    $scope.user = mock_data;
    for (var i = 0; i < $scope.user.groups.length;i++){
        $('#group-edit-list').append('<li class="group">'+ $scope.user.groups[i].name +'</li>');
        $('#group-list').append('<li class="receiver">'+ $scope.user.groups[i].name +'</li>');
    }
    (function (App) {
        
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
                    App.load('test', { photo: photoUrl });
                });
        });

        App.populator('post-to-group', function (page, json) {
            $(page)
                .on('click', ".receiver", function(){
                    if ($(this).hasClass("selected")) {
                        $(this).removeClass("selected");
                    } else {
                        $(this).addClass("selected");
                    }
                });
        });

        try {
            App.restore();
        } catch (err) {
            App.load('home');
        }  

        
    })(App);

}