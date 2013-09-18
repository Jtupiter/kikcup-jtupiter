(function (App) {

    var photoUrl;
    var message;
    var messagePlaceholder = "(optional: enter a message)"

    App.populator('home', function (page) {
        $(page)
            .on('click', "#camBtn", function(){
                cards.photo.get(function (photos) {
                    if (!photos) {

                    } else {
                        $('#photo').attr('src', photos[0]);
                        photoUrl = photos[0];
                    }
                });
        });
        $(page)
            .on('click', "#sendBtn", function() {
                if ($('#message').val() == messagePlaceholder) {
                    message = '';
                } else {
                    message = $('#message').val();
                }
                App.load('contacts');
            });
    });


    try {
        App.restore();
    } catch (err) {
        App.load('home');
    }
})(App);
