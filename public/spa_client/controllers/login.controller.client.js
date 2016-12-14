(function() {
  angular
    .module('AnsonBlog')
    .controller('loginCtrl', loginController)

    loginController.$inject = ['$scope', 'AuthenticationService', '$location'];
    function loginController($scope, AuthenticationService, $location) {
      $scope.credentials = {};
      $scope.returnPage = $location.search().page
      $scope.onSubmit = function() {
        AuthenticationService.login($scope.credentials)
          .then(function() {
            $location.search('page', null);
            $location.path($scope.returnPage);
          })
      }
    }
})()
