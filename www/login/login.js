if (Meteor.isClient) {
    angular.module('inputIconDemo', ['ngMaterial', 'ngMessages'])
      .controller('DemoCtrl', function($scope) {
        $scope.user = {
          name: '',
          email: '',
          password: ''
        };
      });
}