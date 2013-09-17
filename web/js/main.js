(function (App) {
    App.populator('home', function (page) {
    	$(page)
    		.on('click', "#camBtn",function(){
	    		cards.photo.get(function (photos)  {
	                    if (!photos) {

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
