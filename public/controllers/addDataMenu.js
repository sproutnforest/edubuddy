var app = angular.module('edubuddy', []);

app.controller('AddDataMenuController', function($scope, $http) {
    $scope.selectedKategori = ''; // default is empty

    $scope.selectKategori = function(value) {
      $scope.selectedKategori = value;
    };
    
    $scope.selectedKelas = ''; // default is empty

    $scope.selectKelas = function(value) {
      $scope.selectedKelas = value;
    };

    $scope.selectedMataPelajaran = ''; // default is empty

    $scope.selectMapel = function(value) {
      $scope.selectedMataPelajaran = value;
    };

    $scope.submitForm = function() {
        console.log($scope.selectedKategori);
        console.log($scope.selectedKelas)
        console.log($scope.selectedMataPelajaran);
        console.log($scope.sumberbuku);
        const kategori = encodeURIComponent($scope.selectedKategori);
        const kelas = encodeURIComponent($scope.selectedKelas);
        const mapel = encodeURIComponent($scope.selectedMataPelajaran);
        const sumber = encodeURIComponent($scope.sumberbuku);

        const url = `addData.html?kategori=${kategori}&kelas=${kelas}&mapel=${mapel}&sumber=${sumber}`;
        window.location.href = url;
      };
});
