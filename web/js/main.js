(function (App) {
    App.populator('home', function (page) {
    	$('#camBtn').click(function(){
    		cards.photo.get(function (photos)  {
                    if (!photos) {
                    	
                    } else {

                    }
            });
    	})
    });

    try {
        App.restore();
    } catch (err) {
        App.load('home');
    }
})(App);
