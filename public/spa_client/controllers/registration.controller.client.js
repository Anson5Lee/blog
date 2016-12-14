(function() {
  angular
    .module('AnsonBlog')
    .controller('registerCtrl', registrationController)

    registrationController.$inject = ['$scope', 'AuthenticationService', '$location'];
    function registrationController($scope, AuthenticationService, $location) {
      $scope.pageHeader = "注册新用户"
      console.log($location.search());
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
