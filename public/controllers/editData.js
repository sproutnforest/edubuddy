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
      window.location.href = '/login';
    }
  } else {
    localStorage.clear();
    localStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.href = '/login';
  }

  const { createClient } = supabase;

  const SUPABASE_URL = 'https://delgfvwiakcgzglrqucs.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGdmdndpYWtjZ3pnbHJxdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODgzODksImV4cCI6MjA2ODg2NDM4OX0.qZ9RZDhC-dsDT19L3YMA1H2yEP2lVX_cAluHk3Zimws';

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

  const queryParams = new URLSearchParams(window.location.search);
  const dataId = queryParams.get('id');

  console.log(dataId);

  $scope.question = '';
  $scope.answer = '';
  $scope.context = '';
  $scope.source = username;

  supabaseClient
  .from('subject_material')
  .select('*')
  .eq('id', dataId)
  .single()
  .then(({ data, error }) => {
    if (error) {
      console.error('Error loading item:', error);
      return;
    }
    $scope.editItem = data;
    $scope.question = data.Pertanyaan;
    $scope.answer = data.Jawaban;
    $scope.context = data.Konteks;
    if(!$scope.$$phase) $scope.$apply();
  });

  $scope.submitForm = async function() {
  const updatedData = {
    Pertanyaan: $scope.question,
    Jawaban: $scope.answer,
    Konteks: $scope.context,
    SumberBuku: $scope.editItem.SumberBuku,
    Kategori: $scope.editItem.Kategori,
    Pelajaran: $scope.editItem.Pelajaran,
    Kelas: $scope.editItem.Kelas,
    Sumber: $scope.editItem.Sumber,
    SumberSekolah: $scope.editItem.SumberSekolah
  };

  const { error } = await supabaseClient
    .from('subject_material')
    .update(updatedData)
    .eq('id', dataId);

  if (error) {
    console.error('Update failed:', error);
    alert('Update failed: ' + error.message);
  } else {
    alert("Data updated successfully!");
    window.location.href = document.referrer;
  }
};
  
  $scope.logout = function() {
    localStorage.clear();
    window.location.href = '/login';
  }
});

//http://127.0.0.1:5500/public/views/addData.html?kategori=Tambahan&kelas=2&mapel=Seni%20Budaya&sumber=pjok%201