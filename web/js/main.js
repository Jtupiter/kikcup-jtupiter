(function (App) {
    App.populator('home', function (page) {
        $(page)
            .on('click', "#camBtn",function(){
                cards.photo.get(function (photos)  {
                        if (!photos) {

                        } else {
                            $('#photo').attr('src', photos[0]);
                        }
                });

        });
    });

    try {
        App.restore();
    } catch (err) {
        App.load('home');
    }
})(App);
