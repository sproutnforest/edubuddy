var app = angular.module('edubuddy', []);

app.controller('EditDataController', function($scope, $http) {
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

  const queryParams = new URLSearchParams(window.location.search);
  const dataId = queryParams.get('id');

  console.log(dataId);

  $scope.question = '';
  $scope.answer = '';
  $scope.context = '';
  $scope.source = username;

  $http.get('http://103.75.25.77:3000/getDataById/' + dataId)
  .then(function(response) {
    $scope.editItem = response.data;
    console.log($scope.editItem);
    $scope.question = $scope.editItem.Pertanyaan;
    $scope.answer = $scope.editItem.Jawaban;
    $scope.context = $scope.editItem.Konteks;
  })
  .catch(function(error) {
    console.error('Error loading item:', error);
  });

  $scope.submitForm = function() {
    const updatedData = {
      Pertanyaan: $scope.question,
      Jawaban: $scope.answer,
      Konteks: $scope.context,
      SumberBuku: $scope.editItem.SumberBuku, // keep other unchanged fields if needed
      kategori: $scope.editItem.kategori,
      mapel: $scope.editItem.mapel,
      kelas: $scope.editItem.kelas,
      sumber: $scope.editItem.sumber
    };
  
    $http.put('http://103.75.25.77:3000/updateData/' + dataId, updatedData)
      .then(function(response) {
        alert("Data updated successfully!");
        window.location.href = document.referrer;
      })
      .catch(function(error) {
        console.error('Update failed:', error);
      });
  };
  
  $scope.logout = function() {
    localStorage.clear();
    window.location.href = 'login.html';
  }
});

//http://127.0.0.1:5500/public/views/addData.html?kategori=Tambahan&kelas=2&mapel=Seni%20Budaya&sumber=pjok%201