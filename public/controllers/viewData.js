var app = angular.module('edubuddy', []);

app.controller('ViewDataController', function($scope, $http, $window) {
  const params = new URLSearchParams($window.location.search);
  const kategori = params.get("kategori");
    const mapel = params.get("mapel");
    const kelasList = params.getAll("kelas");
    const username = localStorage.getItem('Username');
    const sekolah = localStorage.getItem('AsalSekolah');

    console.log(kategori + mapel + kelasList + username + sekolah)

    $http.get('http://localhost:3000/viewData')
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
        window.location.href = `editData.html?id=${item}`;
      };
      
      $scope.deleteData = function(id) {
        if (confirm("Are you sure you want to delete this item?")) {
          $http.delete('http://localhost:3000/deleteData/' + id)
            .then(function(response) {
              console.log("Deleted:", response.data);
              $scope.filteredData = $scope.filteredData.filter(item => item._id !== id);
            })
            .catch(function(error) {
              console.error("Error deleting:", error);
            });
        }
      };

});
