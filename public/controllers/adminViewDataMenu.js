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

  const { createClient } = supabase;

  const SUPABASE_URL = 'https://delgfvwiakcgzglrqucs.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGdmdndpYWtjZ3pnbHJxdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODgzODksImV4cCI6MjA2ODg2NDM4OX0.qZ9RZDhC-dsDT19L3YMA1H2yEP2lVX_cAluHk3Zimws';

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

  supabaseClient
      .from('subjects')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error loading mapel:', error);
          $scope.mapelList = [{ Subject: "All" }];
        } else {
          // Adjust the property name if your column is not 'Subject'
          $scope.mapelList = [{ Subject: "All" }].concat(data);
        }
        if(!$scope.$$phase) $scope.$apply();
      });

      supabaseClient
    .from('teachers')
    .select('*')
    .then(({ data, error }) => {
      if (error) {
        console.error('Error loading guru:', error);
        $scope.guruList = [{ Username: "All" }];
      } else {
        // Adjust the property name if your column is not 'Teacher'
        $scope.guruList = [{ Username: "All" }].concat(data);
      }
      if(!$scope.$$phase) $scope.$apply();
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
