(function() {
	angular
		.module('AnsonBlog')
		.controller('homeCtrl', homeController)

		function homeController($scope, ArticleService) {
			ArticleService.getAllArticles()
				.success(function(articles) {
					$scope.articles = articles;
				})

		}
})()