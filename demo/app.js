angular.module('demo_lsthhp',['lshttp'])
.controller('demoController', ['$scope', '$lshttp','$http', function($scope, $lshttp, $http){
  $scope.dataLoaded = {};
  $lshttp.enabled = true;
  var start_lshttp = performance.now();
  $lshttp.get('https://jsonplaceholder.typicode.com/comments').then(function(res){
    $scope.dataLoaded_lshttp = res.data;
    var end_lshttp = performance.now();
    $scope.time_lshttp = end_lshttp - start_lshttp;
  })

  var start_http = performance.now();
  $http.get('https://jsonplaceholder.typicode.com/comments').then(function(res){
    $scope.dataLoaded_http = res.data;
    var end_http = performance.now();
    $scope.time_http = end_http - start_http;
  })
}]);
