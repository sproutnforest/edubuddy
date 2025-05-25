var app = angular.module('edubuddy', []);

app.controller('RegisterController', function($scope, $http) {
  $scope.register = function() {
        console.log("username:",  $scope.username);
        console.log("email:", $scope.email);
        console.log("asal sekolah:", $scope.school);
        console.log("password:", $scope.password);

        if($scope.username == "Admin" || $scope.username == "admin") {
          alert("Maaf, username tidak boleh admin");
        }
        else {
        const newAccount = {
          Username: $scope.username,
          Email: $scope.email,
          AsalSekolah: $scope.school,
          Password: $scope.password
        }

        $http.post('http://103.75.25.77:3000/register', newAccount)
        .then(function(response) {
            console.log('Data added:', response.data);
            $scope.username = '';
            $scope.email = '';
            $scope.school = '';
            $scope.password = '';
            const redirectUrl = localStorage.getItem("redirectAfterLogin");

            if (redirectUrl) {
              localStorage.removeItem("redirectAfterLogin");
              window.location.href = redirectUrl;
            } else {
              window.location.href = '/viewDataMenu'; 
            }

        })
        .catch(function(error) {
            console.error('Error adding data:', error);
        });
      }
  };

  
});
