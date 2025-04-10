var app = angular.module('edubuddy', []);

app.controller('RegisterController', function($scope, $http) {
  $scope.register = function() {
        console.log("username:",  $scope.username);
        console.log("email:", $scope.email);
        console.log("asal sekolah:", $scope.school);
        console.log("password:", $scope.password);

        const newAccount = {
          Username: $scope.username,
          Email: $scope.email,
          AsalSekolah: $scope.school,
          Password: $scope.password
        }

        $http.post('http://localhost:3000/register', newAccount)
        .then(function(response) {
            console.log('Data added:', response.data);
            $scope.username = '';
            $scope.email = '';
            $scope.school = '';
            $scope.password = '';
        })
        .catch(function(error) {
            console.error('Error adding data:', error);
        });
  };
});
