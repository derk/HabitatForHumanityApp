

if (Meteor.isClient) {
  angular.module('inputIconDemo', ['ngMaterial', 'ngMessages'])
    .controller('DemoCtrl', function($scope) {
      $scope.user = {
        name: '',
        email: '',
        password: '',
        chapter: ''
      };
    });

'use strict';
angular
    .module('selectDemoOptGroups', ['ngMaterial'])
    .controller('SelectOptGroupController', function($scope) {
      $user.chapters = [
          'small (12-inch)',
          'medium (14-inch)',
          'large (16-inch)',
          'insane (42-inch)'
      ];
    });

  angular.module('whiteframeBasicUsage', ['ngMaterial'])

Template.registration.events({
  'submit form': function(event){
    event.preventDefault();
    console.log("Form Submitted");
    console.log(event.type);
  }
});
      
}


if (Meteor.isServer){

}
