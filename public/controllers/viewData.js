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

  const { createClient } = supabase;

  const SUPABASE_URL = 'https://delgfvwiakcgzglrqucs.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGdmdndpYWtjZ3pnbHJxdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODgzODksImV4cCI6MjA2ODg2NDM4OX0.qZ9RZDhC-dsDT19L3YMA1H2yEP2lVX_cAluHk3Zimws';

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

  const params = new URLSearchParams($window.location.search);
  const kategori = params.get("kategori");
    const mapel = params.get("mapel");
    const kelasList = params.getAll("kelas");

    if (!kategori || !mapel || kelasList.length === 0) {
      window.location.href = '/viewDataMenu';
      return;
    }

    supabaseClient
    .from('subject_material')
    .select('*')
    .then(({ data, error }) => {
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      const allData = data;
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
      if(!$scope.$$phase) $scope.$apply();
    });

    $scope.editData = function(item) {
        window.location.href = `/editData?id=${item}`;
      };

      $scope.addData = function() {
        window.location.href = '/addDataMenu';
      }
      
      $scope.deleteData = async function(id) {
        if (confirm("Are you sure you want to delete this item?")) {
            const { error } = await supabaseClient
                .from('subject_material')
                .delete()
                .eq('id', id);

            if (error) {
                console.error("Error deleting:", error);
                alert("Gagal menghapus data: " + error.message);
            } else {
                console.log("Deleted:", id);
                $scope.filteredData = $scope.filteredData.filter(item => item.id !== id);
                if(!$scope.$$phase) $scope.$apply();
            }
        }
    };

      $scope.logout = function() {
        localStorage.clear();
        window.location.href = '/login';
      }

});
