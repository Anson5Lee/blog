(function(){
	angular
		.module('AnsonBlog', ['ngRoute', 'ui.bootstrap', 'ui.tinymce'])
		.config(config)

		function config($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					redirectTo: '/article'
				})
				.when('/article', {
					templateUrl: '/views/home.view.client.html',
					controller: 'homeCtrl'
				})
				.when('/article/:aid', {
					templateUrl: '/views/article.view.client.html',
					controller: 'articleCtrl'
				})
				.when('/register', {
					templateUrl: '/views/registration.view.client.html'
				})
				.when('/login', {
					templateUrl: '/views/login.view.client.html'
				})
				.when('/tinymce', {
					templateUrl: '/views/tinymce.html',
					controller: 'TinyMceController'
				})
				.otherwise({
					redirectTo: '/article'
				})
			// $locationProvider.html5Mode(true);
		}
})()
