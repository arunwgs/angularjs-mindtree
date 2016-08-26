var app = angular.module("exampleApp",[]);

app.controller("topLevelCtrl", function($scope){
	$scope.dataValue = "Hello, World";

	$scope.reverseText = function() {
		console.log("topLevelCtrl reverseText");
		$scope.dataValue = $scope.dataValue.split("").reverse().join("");
	}

	$scope.changeCase = function(){
		var result = [];

		angular.foreach($scope.dataValue.split(""),function(char,index){
			result.push(index %2 == 1 ? char.toString().toUpperCase() : char.toString().toLowerCase());
		});
        $scope.dataValue = result.join("");
	};
});

app.controller("firstChildCtrl", function($scope){

	$scope.changeCase = function(){
		console.log("firstChildCtrl");
		$scope.dataValue = $scope.dataValue.toUpperCase();
	};
});



