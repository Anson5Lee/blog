(function(){
	angular
		.module('AnsonBlog', ['ngRoute', 'ui.bootstrap'])
		.config(configFn)

		configFn.$inject = ['$routeProvider', '$locationProvider'];
		function configFn($routeProvider, $locationProvider) {
			$routeProvider
				.when('/article', {
					templateUrl: 'spa_client/views/home.view.client.html',
					controller: 'homeCtrl'
				})
				.when('/article/:aid', {
					templateUrl: 'spa_client/views/article.view.client.html',
					controller: 'articleCtrl',
					resolve : {
						articleMeta : getArticleData
					}
				})
				.when('/register', {
					templateUrl: 'spa_client/views/registration.view.client.html',
					controller: 'registerCtrl'
				})
				.when('/login', {
					templateUrl: 'spa_client/views/login.view.client.html',
					controller: 'loginCtrl'
				})
				.otherwise({
					redirectTo: '/article'
				})
			$locationProvider.html5Mode(true);

		}

		getArticleData.$inject = ['$route', 'ArticleService'];
		function getArticleData($route, ArticleService) {
			var articleId = $route.current.params.aid;
			var promise =  ArticleService.getArticleById(articleId);
			return promise;
		}

})()
