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
