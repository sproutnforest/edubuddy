var app = angular.module('edubuddy', []);

app.controller('AddDataController', function($scope, $http) {
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
      alert("Session expired. Please login again.");
      localStorage.clear();
    }
  } else {
    localStorage.clear();
    alert("No login session found. Please login.");
  }
  console.log("Logged in as:", username);
  console.log("From school:", sekolah);
  console.log("Stored LoginTime:", localStorage.getItem('LoginTime'));

  const queryParams = new URLSearchParams(window.location.search);
  const kategori = queryParams.get('kategori');
  const kelas = queryParams.get('kelas');
  const mapel = queryParams.get('mapel');
  const sumber = queryParams.get('sumber');

  console.log("Kategori:", kategori);
  console.log("Kelas:", kelas);
  console.log("Mapel:", mapel);
  console.log("Sumber:", sumber);

  $scope.questions = [{ value: '' }];
  $scope.answer = '';
  $scope.context = '';
  $scope.source = username;

  $scope.addTextarea = function() {
    $scope.questions.push({ value: '' });
  };

  $scope.submitForm = function() {
    try {
      const questions = $scope.questions.map(t => t.value.trim()).filter(q => q !== '');
      const answer = $scope.answer;
      const context = $scope.context;
  
      if (questions.length && answer && context && $scope.source) {
        const materials = questions.map(q => ({
          Sumber: $scope.source,
          Kategori: kategori,
          Pelajaran: mapel,
          Kelas: kelas,
          SumberBuku: sumber,
          Pertanyaan: q,
          Jawaban: answer,
          Konteks: context
        }));
  
        $http.post('http://localhost:3000/addData', materials)
          .then(function(response) {
            console.log('Data added:', response.data);
            $scope.questions = [{ value: '' }];
            $scope.answer = '';
            $scope.context = '';
          })
          .catch(function(error) {
            console.error('Error adding data:', error);
          });
      } else {
        alert('Tolong isi semua ketentuan');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
});

//http://127.0.0.1:5500/public/views/addData.html?kategori=Tambahan&kelas=2&mapel=Seni%20Budaya&sumber=pjok%201