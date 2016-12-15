(function() {
	angular
		.module('AnsonBlog')
		.controller('homeCtrl', homeController)

		homeController.$inject = ['$scope', 'ArticleService', '$sce'];
		function homeController($scope, ArticleService, $sce) {
			$scope.checkSafeHTML = function(html) {
				return $sce.trustAsHtml(html)
			}
			ArticleService.getAllArticles()
				.success(function(response) {
					// console.log(response.data);
					$scope.articles = response.data;
				})
		}
})()
