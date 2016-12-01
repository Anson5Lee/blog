(function() {
	angular
		.module('AnsonBlog')
		.controller('articleCtrl', articleController)

		function articleController($scope, $routeParams, ArticleService, $uibModal, $q) {
			var articleId = $routeParams.aid;
			$scope.articleId = articleId;
			var deferred = $q.defer();
			ArticleService.getArticleById(articleId)
				.success(function(article) {
					$scope.article = article;
					deferred.resolve();
				})

			$scope.popupCommentModal = function() {
				var uibModalInstance = $uibModal.open({
					templateUrl: '/views/comment.view.client.html',
					controller: 'commentModalCtrl',
					resolve: {
						articleData: articleData
					}
				})

				uibModalInstance
					.result
					.then(function(data) {
						// console.log("modal returned data" + data);
						$scope.article.comments.push(data);
						console.log($scope.article);
					})
			}

			function articleData() {
				return {
					articleTitle : $scope.article.title,
					articleId: articleId
				}
			}
		}
})()