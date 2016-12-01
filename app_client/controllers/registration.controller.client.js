(function() {
  angular
    .module('AnsonBlog')
    .controller('registerCtrl', registrationController)


    function registrationController($scope, AuthenticationService, $location) {
      $scope.returnPage = $location.search().page || '/';
      $scope.credentials = {};
      $scope.onSubmit = function() {
        AuthenticationService.register($scope.credentials)
          .then(function() {
            $location.search('page', null);
            $location.path($scope.returnPage);
          })
      }
    }
})()
