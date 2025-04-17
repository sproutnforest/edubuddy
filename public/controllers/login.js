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
      const redirectUrl = localStorage.getItem("redirectAfterLogin");

      if (redirectUrl) {
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirectUrl;
      } else {
        window.location.href = 'viewDataMenu.html';
      }
    })
    console.log("hi");
  };
});
