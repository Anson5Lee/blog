(function(){
  angular
    .module('AnsonBlog')
    .controller('navigationCtrl', navigationController)

    navigationController.$inject = ['$scope', '$location', 'AuthenticationService'];
    function navigationController($scope, $location, AuthenticationService) {
      $scope.currentPath = $location.path();
      $scope.isLoggedIn = AuthenticationService.isLoggedIn();
      $scope.currentUser = AuthenticationService.currentUser();
      $scope.logout = function() {
        AuthenticationService.logout();
        $location.path('/');
      }
    }
})()
