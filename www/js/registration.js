if (Meteor.isClient) {
    angular.module('inputIconDemo', ['ngMaterial', 'ngMessages'])
      .controller('DemoCtrl', function($scope) {
        $scope.user = {
          name: '',
          email: '',
          password: ''
        };
      });

    angular.module('selectDemoOptGroups', ['ngMaterial'])
      .controller('SelectOptGroupController', function($scope) {
        $scope.chapter = [
            "Chapter 1",
            "Chapter 2",
            "Chapter 3",
            "Chapter 4"
        ];
      });
}