(function (App) {
    App.populator('home', function (page) {
        $(page)
            .find('#camBtn')
            .on('click', function () {
                cards.photo.get(function (photos)  {
                    if (!photos) {
                        // action cancelled by user
                    } else {

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
