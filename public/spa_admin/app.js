(function() {
  angular
    .module('AnsonBlogAdmin', ['ui.router'])
    .config(config)

    config.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider'];
    function config($urlRouterProvider, $stateProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/admin');
      $locationProvider.html5Mode(true);
      $stateProvider
        .state({
          name: 'login',
          url: '/admin/login',
          templateUrl: 'spa_admin/views/login.view.html',
          controller: 'loginCtrl'
        })
        .state({
          name: 'main',
          url: '/admin',
          templateUrl: 'spa_admin/views/main.view.html',
          resolve: {
            loginCheck: checkLogin
          },
          controller: 'mainCtrl'
        })
    }
    checkLogin.$inject = ['$q', '$http', '$rootScope', '$state'];
    function checkLogin($q, $http, $rootScope, $state) {
      var deferred = $q.defer();
      $http.get('/api/admin/loggedin').success(function(user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user != '0') {
          $rootScope.currentUser = user;
          deferred.resolve();
        } else { // User is not authenticated
          $rootScope.errorMessage = 'You need to log in.';
          console.log($rootScope.errorMessage);
          deferred.reject();
          $state.go('login');
        }
      })
    }
 })()
