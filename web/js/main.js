(function (App) {
    
    var photoUrl; // don't remove this until we have a better solution

    App.populator('home', function (page) {
        $(page)
            .on('click', "#camBtn", function(){
                cards.photo.get(function (photos) {
                    if (!photos) {

                    } else {
                        $('#photo').attr('src', photos[0]);
                        photoUrl = photos[0];
                    }
                })})
            .on('click', "#sendBtn", function() {
                var message; 
                if ($('#message').val().replace(' ','') != '') {
                    message = $('#message').val();
                }
                cards.kik.send({
                    title : 'Ping!',
                    text : message,
                    data : { pic : photoUrl }
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

    App.populator('receiving', function (page, json) {
        $('#received-photo').attr('src', json.pic);
    });

    if (cards.kik.message) {
        App.load('receiving', cards.kik.message.data);
    } else {
        try {
            App.restore();
        } catch (err) {
            App.load('home');
        }  
    }

    
})(App);
