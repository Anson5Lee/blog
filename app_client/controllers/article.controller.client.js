(function() {
	angular
		.module('AnsonBlog')
		.controller('articleCtrl', articleController)

		function articleController($scope, $routeParams, ArticleService, AuthenticationService, $location, $uibModal, $q) {

			$scope.isLoggedIn = AuthenticationService.isLoggedIn();
			$scope.currentPath = $location.path();

			var articleId = $routeParams.aid;
			$scope.articleId = articleId;
			var deferred = $q.defer();
			ArticleService.getArticleById(articleId)
				.success(function(response) {
					$scope.article = response.data;
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
						$scope.article.comments.push(data.data);
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
