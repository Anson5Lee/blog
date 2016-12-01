(function() {
	angular
		.module('AnsonBlog')
		.controller('homeCtrl', homeController)

		function homeController($scope, ArticleService) {
			ArticleService.getAllArticles()
				.success(function(response) {
					$scope.articles = response.data;
				})

		}
})()
