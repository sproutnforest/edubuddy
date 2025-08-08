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

  const { createClient } = supabase;

  const SUPABASE_URL = 'https://delgfvwiakcgzglrqucs.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGdmdndpYWtjZ3pnbHJxdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODgzODksImV4cCI6MjA2ODg2NDM4OX0.qZ9RZDhC-dsDT19L3YMA1H2yEP2lVX_cAluHk3Zimws';

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

    $scope.selectedKategori = ''; // default is empty

    $scope.selectKategori = function(value) {
      $scope.selectedKategori = value;
    };
    
    $scope.selectedKelas = ''; // default is empty

    $scope.selectKelas = function(value) {
      $scope.selectedKelas = value;
    };

    $scope.selectedMataPelajaran = ''; // default is empty

  supabaseClient
      .from('subjects')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
            console.error('Error loading mapel:', error);
            $scope.mapelList = [];
        } else {
          $scope.mapelList = data;
        }
        if(!$scope.$$phase) $scope.$apply();
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

        const url = `/addData?kategori=${kategori}&kelas=${kelas}&mapel=${mapel}&sumber=${sumber}`;
        window.location.href = url;
      };

      $scope.logout = function() {
        localStorage.clear();
        window.location.href = '/login';
      }
});
