var app = angular.module('edubuddy', []);

app.controller('LoginController', function($scope, $http) {
  $scope.login = function() {
    console.log("username:",  $scope.username);
    console.log("password:", $scope.password);

    $http.post('http://localhost:3000/login', {
      username: $scope.username,
      password: $scope.password
    })
    .then(function(response) {
      console.log("Login success:", response.data);
  
      localStorage.setItem('Username', response.data.Username);
      localStorage.setItem('AsalSekolah', response.data.AsalSekolah);
      localStorage.setItem('LoginTime', new Date().toISOString()); 
    })
    console.log("hi");
  };
});
