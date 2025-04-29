var app = angular.module('edubuddy', []);

app.controller('LoginController', function($scope, $http) {
  $scope.login = function() {
    console.log("email:",  $scope.email);
    console.log("password:", $scope.password);

    $http.post('http://103.75.25.77:3000/login', {
      email: $scope.email,
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
    }).catch(function(error) {
      if (error.status === 401) {
        alert("Email atau password salah.");
      } else {
        alert("Terjadi kesalahan saat login. Silakan coba lagi nanti.");
      }
      console.error("Login error:", error);
    });
  };
});
