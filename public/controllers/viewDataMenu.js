var app = angular.module('edubuddy', []);

app.controller('ViewDataMenuController', function($scope, $http) {
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
  if(username == 'Admin') {
    window.location.href = 'adminViewDataMenu.html';
  }

    $http.get('http://103.75.25.77:3000/mapel')
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
      
    $scope.addData = function() {
      window.location.href = 'addDataMenu.html';
    }

    $scope.submitForm = function() {
      const anyKelasSelected = Object.values($scope.selectedCheckboxes || {}).some(Boolean);

    if (
        !$scope.selectedKategori ||
        !$scope.selectedMataPelajaran ||
        !anyKelasSelected
    ) {
        alert('Semua field wajib diisi (Kategori, Mata Pelajaran, dan minimal satu Kelas).');
        return;
    }

        console.log($scope.selectedKategori);
        const kelasList = $scope.getSelectedKelas();
        const kelas = kelasList.map(encodeURIComponent).join('&kelas='); 
        console.log(kelas);
        console.log("hi");
        console.log($scope.selectedMataPelajaran);

        const url = `viewData.html?kategori=${$scope.selectedKategori}&kelas=${kelas}&mapel=${$scope.selectedMataPelajaran}`;
        window.location.href = url;    
    };

    $scope.logout = function() {
      localStorage.clear();
      window.location.href = 'login.html';
    }
});
