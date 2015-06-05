angular.module('inputIconDemo', ['ngMaterial', 'ngMessages'])
  .controller('DemoCtrl', function($scope) {
    $scope.user = {
      name: '',
      email: '',
      password: ''
    };
  });

angular.module('selectDemoValidation', ['ngMaterial', 'ngMessages'])
.controller('AppCtrl', function($scope) {
  $scope.clearValue = function() {
    $scope.myModel = undefined;
  };
  $scope.save = function() {
    alert('Form was valid!');
  };
});
