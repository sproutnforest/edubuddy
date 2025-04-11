var app = angular.module('edubuddy', []);

app.controller('AddDataMenuController', function($scope, $http) {

    $http.get('http://localhost:3000/mapel')
      .then(function(response) {
        $scope.mapelList = [{ Subject: "All" }].concat(response.data);
      })
      .catch(function(error) {
        console.error('Error loading mapel:', error);
      });

    $scope.selectedMataPelajaran = '';

    $scope.selectMapel = function(mapel) {
      $scope.selectedMataPelajaran = mapel;
    };

    $scope.selectedKategori = ''; 

    $scope.selectKategori = function(value) {
      $scope.selectedKategori = value;
    };

    $scope.selectedCheckboxes = {};

    $scope.getSelectedKelas = function () {
        const selected = [];
        for (let key in $scope.selectedCheckboxes) {
          if ($scope.selectedCheckboxes[key]) {
            selected.push(key);
          }
        }
        console.log("Selected Numbers:", selected);
        return selected; 
    };
      


    $scope.submitForm = function() {
        console.log($scope.selectedKategori);
        const kelasList = $scope.getSelectedKelas();
        const kelas = kelasList.map(encodeURIComponent).join('&kelas='); 
        console.log(kelas);
        console.log("hi");
        console.log($scope.selectedMataPelajaran);

        const url = `viewData.html?kategori=${$scope.selectedKategori}&kelas=${kelas}&mapel=${$scope.selectedMataPelajaran}`;
        window.location.href = url;    
    };
});
