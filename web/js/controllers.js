function PingCtrl($scope, $http) {
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
	$scope.user = mock_data

};