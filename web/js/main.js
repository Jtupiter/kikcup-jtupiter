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
                })
            .on('click', "#sendBtn", function() {
                if ($('#message').val() == messagePlaceholder) {
                    message = '';
                } else {
                    message = $('#message').val();
                }
                App.load('contacts');
            });
        });
    });

    App.populator('contacts', function (page) {
        $(page)
            .on('click', ".receiver", function(){
                if ($(this).hasClass("selected")){
                    $(this).removeClass("selected");
                }
                else {
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
