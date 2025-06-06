var app = angular.module('edubuddy', []);

app.controller('ViewDataController', function($scope, $http, $window) {
  const username = localStorage.getItem('Username');
  const sekolah = localStorage.getItem('AsalSekolah');
  const loginTimeStr = localStorage.getItem('LoginTime');
  console.log(localStorage.getItem('LoginTime'));

  if (loginTimeStr) {
    const loginTime = new Date(loginTimeStr);
    const now = new Date();
    const diffMinutes = (now - loginTime) / 60000;

    if (diffMinutes > 30) {
      localStorage.clear();
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.href = '/login';
    }
  } else {
    localStorage.clear();
    localStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.href = '/login';
  }
  if(username == 'Admin') {
    window.location.href = '/adminViewDataMenu';
  }

  const params = new URLSearchParams($window.location.search);
  const kategori = params.get("kategori");
    const mapel = params.get("mapel");
    const kelasList = params.getAll("kelas");

    if (!kategori || !mapel || kelasList.length === 0) {
      window.location.href = '/viewDataMenu';
      return;
    }

    $http.get('http://103.75.25.77:3000/viewData')
    .then(function(response) {
        const allData = response.data;
        console.log("All Data:", allData);

        $scope.filteredData = allData.filter(item => {
        const matchUser = item.Sumber === username;
        const matchSchool = item.SumberSekolah === sekolah;
        const matchKategori = kategori === "All" || item.Kategori === kategori;
        const matchMapel = mapel === "All" || item.Pelajaran === mapel;
        const matchKelas = kelasList.length === 0 || kelasList.includes(item.Kelas);

        return matchUser && matchSchool && matchKategori && matchMapel && matchKelas;
        });

        console.log("Filtered Data:", $scope.filteredData);
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    });

    $scope.editData = function(item) {
        window.location.href = `/editData?id=${item}`;
      };

      $scope.addData = function() {
        window.location.href = '/addDataMenu';
      }
      
      $scope.deleteData = function(id) {
        if (confirm("Are you sure you want to delete this item?")) {
          $http.delete('http://103.75.25.77:3000/deleteData/' + id)
            .then(function(response) {
              console.log("Deleted:", response.data);
              $scope.filteredData = $scope.filteredData.filter(item => item._id !== id);
            })
            .catch(function(error) {
              console.error("Error deleting:", error);
            });
        }
      };

      $scope.logout = function() {
        localStorage.clear();
        window.location.href = '/login';
      }

});
