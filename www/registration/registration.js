
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

  angular.module('whiteframeBasicUsage', ['ngMaterial']);



var hfhControllerModule = angular.module('hfhControllerModule', []);


hfhControllerModule.controller('loginCtrl', ['$scope', 'Auth', '$state', 'ngNotify', '$timeout', '$ionicLoading', function($scope, Auth, $state, ngNotify, $timeout, $ionicLoading) {
     if($scope.isAuthenticated() === true) {
         //IF SUCCESSFULLY AUTH-ED USER IS TRYING TO GO TO LOGIN PAGE => SEND TO HOME PAGE OF APP
         $state.go('secure.cfeed');
     }
     $scope.salt = "nfp89gpe"; //PENDING - NEED TO GET ACTUAL SALT
     $scope.$parent.submit = function() {
         if ($scope.userName && $scope.passWord) {
             document.activeElement.blur();
             $ionicLoading.show();
             $scope.passWordHashed = new String(CryptoJS.SHA512($scope.passWord + $scope.userName + $scope.salt));
             Auth.setCredentials($scope.userName, $scope.passWordHashed);
             $scope.userName = '';
             $scope.passWord = '';
             $scope.loginResultPromise = $scope.Restangular().all("users").all("myUser").getList();
             $scope.success = false;
             $scope.loginResultPromise.then(function(result) {
                 $scope.loginResult = result;
                 $scope.loginMsg = "You have logged in successfully!";
                 Auth.confirmCredentials();
                 $state.go("secure.cfeed", {}, {reload: true});
                 ngNotify.set($scope.loginMsg, 'success');
                 $scope.success = true;
                 $ionicLoading.hide();
             }, function(error) {
                 $scope.loginMsg = "Incorrect username or password.";
                 ngNotify.set($scope.loginMsg, {position: 'top', type: 'error'});
                 Auth.clearCredentials();
                 $scope.success = true;
                 $ionicLoading.hide();
             });
             $timeout(function() {
                 if(!$scope.success) {
                     $scope.loginMsg = "Incorrect username or password.";
                     ngNotify.set($scope.loginMsg, {position: 'top', type: 'error'});
                     Auth.clearCredentials();
                     $ionicLoading.hide();
                 } else {
                     //$scope.loginMsg = "Not doing it.";
                     //ngNotify.set($scope.loginMsg, {position: 'top', type: 'error'});
                 }
             }, 10000)
         } else {
             $scope.loginMsg = "Please enter a username and password.";
             ngNotify.set($scope.loginMsg, {position: 'top', type: 'error'});
         }
     };
 }]);

}