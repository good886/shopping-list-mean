var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/shoppinglist').success(function(response) {
    console.log("I got the data I requested");
    $scope.shoppinglist = response;
    $scope.product = "";
  });
};

refresh();

$scope.addProduct = function() {
  console.log($scope.product);
  $http.post('/shoppinglist', $scope.product).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/shoppinglist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/shoppinglist/' + id).success(function(response) {
    $scope.product = response;
  });
};  

$scope.update = function() {
  console.log($scope.product._id);
  $http.put('/shoppinglist/' + $scope.product._id, $scope.product).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.product = "";
}

}]);﻿