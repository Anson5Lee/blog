(function() {
  angular
    .module('AnsonBlogAdmin', ['ui.router'])
    .config(config)

    config.$inject = ['$urlRouterProvider', '$stateProvider']
    function config($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/main');
      $stateProvider
        .state({
          name: 'login',
          url: '/login',
          templateUrl: 'views/login.view.html',
          controller: 'loginCtrl'
        })
        .state({
          name: 'main',
          url: '/main',
          templateUrl: 'views/main.view.html',
          resolve: {
            loginCheck: checkLogin
          },
          controller: 'mainCtrl'
        })
    }

    function checkLogin($q, $http, $location, $rootScope) {
      var deferred = $q.defer();
      $http.get('/loggedin').success(function(user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user != '0') {
          $rootScope.currentUser = user;
          // console.log(user);
          deferred.resolve();
        } else { // User is not authenticated
          $rootScope.errorMessage = 'You need to log in.';
          console.log($rootScope.errorMessage);
          deferred.reject();
          $location.url('/login');
        }
      })
    }
 })()
