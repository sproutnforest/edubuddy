var app = angular.module('edubuddy', []);

app.controller('AddDataController', function($scope, $http) {
  $scope.questions = [{ value: '' }];
  $scope.answer = '';
  $scope.context = '';
  $scope.source = 'admin';

  $scope.addTextarea = function() {
    $scope.questions.push({ value: '' });
  };

  $scope.submitForm = function() {
    try {
        const questions = $scope.questions.map(t => t.value);
        const answer = $scope.answer;
        const context = $scope.context;
        console.log("Questions values:", questions);
        console.log("Answers:", answer);
        console.log("Context:", context);

        if ($scope.questions && $scope.answer && $scope.context && $scope.source) {
            const newMaterial = {
                Sumber: $scope.source,
                Pertanyaan: $scope.questions,
                Jawaban: $scope.answer,
                Konteks: $scope.context
            };

            $http.post('http://localhost:3000/addData', newMaterial)
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
            alert('Tolong is semua ketentuan');
        }
    } 
    catch (error) {
        console.error('Error:', error.message);
    }
  };
});
