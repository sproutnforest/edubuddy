var app = angular.module('edubuddy', []);

app.controller('RegisterController', function($scope, $http) {
  console.log("RegisterController initialized");

    const { createClient } = supabase;

  const SUPABASE_URL = 'https://delgfvwiakcgzglrqucs.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGdmdndpYWtjZ3pnbHJxdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODgzODksImV4cCI6MjA2ODg2NDM4OX0.qZ9RZDhC-dsDT19L3YMA1H2yEP2lVX_cAluHk3Zimws';

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
  
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

        // ...existing code...
      console.log("New account data:", newAccount);

      // Replace $http.post with Supabase insert
      supabaseClient
        .from('teachers')
        .insert([newAccount])
        .then(({ data, error }) => {
          if (error) {
            console.log('Error adding data:', error);
            alert('Gagal mendaftar: ' + error.message);
            return;
          }
          console.log('Data added:', data);
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
          // If using AngularJS, trigger digest cycle if needed
          if(!$scope.$$phase) $scope.$apply();
        });
      }
  };
});
