(function() {
	angular
		.module('AnsonBlog')
		.controller('articleCtrl', articleController)
		articleController.$inject = ['$scope', '$routeParams', 'ArticleService', 'AuthenticationService', '$location', '$uibModal', '$q', '$sce', 'articleMeta']
		function articleController($scope, $routeParams, ArticleService, AuthenticationService, $location, $uibModal, $q, $sce, articleMeta) {
			$scope.article = articleMeta.data.data;
			$scope.isCommentsShown = false;
			$scope.showComments = function() {
				$scope.isCommentsShown = true;
			}
			$scope.isLoggedIn = AuthenticationService.isLoggedIn();
			$scope.currentPath = $location.path();
			$scope.checkSafeHTML = function(html) {
				return $sce.trustAsHtml(html)
			}

			$scope.popupCommentModal = function() {
				var uibModalInstance = $uibModal.open({
					templateUrl: 'spa_client/views/comment.view.client.html',
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
					articleId: $routeParams.aid
				}
			}
		}
})()
