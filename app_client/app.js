(function(){
	angular
		.module('AnsonBlog', ['ngRoute', 'ui.bootstrap'])
		.config(config)

		function config($routeProvider, $locationProvider) {
			$routeProvider
				.when('/article', {
					templateUrl: '/views/home.view.client.html',
					controller: 'homeCtrl'
				})
				.when('/article/:aid', {
					templateUrl: '/views/article.view.client.html',
					controller: 'articleCtrl'
				})
				.when('/register', {
					templateUrl: '/views/registration.view.client.html',
					controller: 'registerCtrl'
				})
				.when('/login', {
					templateUrl: '/views/login.view.client.html',
					controller: 'loginCtrl'
				})
				.otherwise({
					redirectTo: '/article'
				})
			// $locationProvider.html5Mode(true);
		}
})()
