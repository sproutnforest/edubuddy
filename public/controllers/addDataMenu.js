var app = angular.module('edubuddy', []);

app.controller('AddDataMenuController', function($scope, $http) {
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
      window.location.href = 'login.html';
    }
  } else {
      localStorage.clear();
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.href = 'login.html';
  }
  console.log("Logged in as:", username);
  console.log("From school:", sekolah);
  console.log("Stored LoginTime:", localStorage.getItem('LoginTime'));

    $scope.selectedKategori = ''; // default is empty

    $scope.selectKategori = function(value) {
      $scope.selectedKategori = value;
    };
    
    $scope.selectedKelas = ''; // default is empty

    $scope.selectKelas = function(value) {
      $scope.selectedKelas = value;
    };

    $scope.selectedMataPelajaran = ''; // default is empty

    $http.get('http://localhost:3000/mapel')
      .then(function(response) {
        $scope.mapelList = response.data;
      })
      .catch(function(error) {
        console.error('Error loading mapel:', error);
      });

    $scope.selectMapel = function(mapel) {
      $scope.selectedMataPelajaran = mapel;
    };

    $scope.submitForm = function() {
        if (!$scope.selectedKategori || !$scope.selectedKelas || !$scope.selectedMataPelajaran || !$scope.sumberbuku) {
          alert('Semua field wajib diisi.');
          return;
      }
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

      $scope.logout = function() {
        localStorage.clear();
        window.location.href = 'login.html';
      }
});
