(function(){
  angular
    .module('AnsonBlog')
    .controller('navigationCtrl', navigationController)

    navigationController.$inject = ['$scope', '$location', 'AuthenticationService'];

    function navigationController($scope, $location, AuthenticationService) {

      $scope.currentPath = $location.path();
      $scope.isLoggedIn = AuthenticationService.isLoggedIn();
      $scope.currentUser = AuthenticationService.currentUser();
      $scope.$watch(AuthenticationService.isLoggedIn, function(newVal){
        $scope.isLoggedIn = newVal;
        $scope.currentUser = AuthenticationService.currentUser();
      })
      var locationChangeFn = function() {
        return $location.path();
      }
      $scope.$watch(locationChangeFn, function(newVal, oldVal) {
        $scope.currentPath = $location.path();
      })

      $scope.logout = function() {
        AuthenticationService.logout();
          $location.path('/article');
      }
    }
})()
