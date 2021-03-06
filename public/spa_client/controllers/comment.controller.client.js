(function() {
	angular
		.module('AnsonBlog')
		.controller('commentModalCtrl', commentModalController)

		commentModalController.$inject = ['$scope', 'articleData', '$uibModalInstance', 'ArticleService'];
		function commentModalController($scope, articleData, $uibModalInstance, ArticleService) {
			$scope.articleData = articleData;
			$scope.onSubmit = function(){
				console.log($scope.comment);
				$scope.Error = "";
				if (!$scope.comment) {
					$scope.Error = "评论内容不能为空！";
					return false;
				} else {
					$scope.addComment(articleData.articleId, $scope.comment)
				}
			}

			$scope.addComment = function(articleId, comment) {
				ArticleService
					.addCommentByArticleId(articleId, {
						commentBody: comment.commentBody
					})
					.success(function(data) {
						$scope.modal.close(data);
					})
			}

			$scope.modal = {
				close : function(result) {
					$uibModalInstance.close(result);
				},
				cancel: function() {
					$uibModalInstance.dismiss('cancel');
				}
			}
		}
})()
