var myapp= angular.module('myapp',[]);
myapp.controller('appctrl',['$scope','$http',function($scope,$http){

	var refresh=function(){
		$http.get('/contactlist').success(function(response){
		$scope.contactlist = response;
		$scope.contact="";
		});
	};

	refresh();

	$scope.addcontact=function(){
		$http.post('/contactlist',$scope.contact).success(function(response){
		refresh();
		});
	};

	$scope.remove = function(id){
		$http.delete('/contactlist/'+id).success(function(response){
		refresh();
		});
	};

	$scope.edit = function(id){
		$http.get('/contactlist/'+id).success(function(response){
		$scope.contact = response;
		});
	};

	$scope.update = function(){
		if($scope.contact){
		$http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(function(response){
		refresh();
		});
		}
		else{
		alert("click on edit for the contact that u want to update");
		}
	};

	$scope.clear = function(){
		$scope.contact="";
	};

}]);
