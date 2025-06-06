var app = angular.module('edubuddy', []);

app.controller('AdminViewDataMenuController', function($scope, $http) {
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
  if(username != 'Admin') {
    window.location.href = '/viewDataMenu';
  }

    $http.get('http://103.75.25.77:3000/mapel')
      .then(function(response) {
        $scope.mapelList = [{ Subject: "All" }].concat(response.data);
      })
      .catch(function(error) {
        console.error('Error loading mapel:', error);
      });
    
      $http.get('http://103.75.25.77:3000/guru')
        .then(function(response) {
            const usernames = response.data.map(guru => ({ Teacher: guru.Username }));
            $scope.guruList = [{ Teacher: "All" }].concat(usernames);
        })
        .catch(function(error) {
            console.error('Error loading guru:', error);
        });

    $scope.selectedMataPelajaran = '';

    $scope.selectMapel = function(mapel) {
      $scope.selectedMataPelajaran = mapel;
    };

    $scope.selectedGuru = '';

    $scope.selectGuru = function(guru) {
      $scope.selectedGuru = guru;
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
      
    $scope.addData = function() {
      window.location.href = '/addDataMenu';
    }

    $scope.submitForm = function() {
      const anyKelasSelected = Object.values($scope.selectedCheckboxes || {}).some(Boolean);

    if (
        !$scope.selectedKategori ||
        !$scope.selectedMataPelajaran ||
        !$scope.selectedGuru ||
        !anyKelasSelected
    ) {
        alert('Semua field wajib diisi (Kategori, Mata Pelajaran, Guru, dan minimal satu Kelas).');
        return;
    }

        const kelasList = $scope.getSelectedKelas();
        const kelas = kelasList.map(encodeURIComponent).join('&kelas='); 
        console.log(kelas);
        console.log("hi");
        console.log($scope.selectedMataPelajaran);

        const url = `/adminViewData?kategori=${$scope.selectedKategori}&kelas=${kelas}&guru=${$scope.selectedGuru}&mapel=${$scope.selectedMataPelajaran}`;
        window.location.href = url;    
    };

    $scope.logout = function() {
      localStorage.clear();
      window.location.href = '/login';
    }
});
