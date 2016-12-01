(function() {
	angular
		.module('AnsonBlog')
		.controller('commentModalCtrl', commentModalController)

		function commentModalController($scope, articleData, $uibModalInstance, ArticleService) {
			$scope.articleData = articleData;
			$scope.onSubmit = function(){
				$scope.Error = "";
				if (!$scope.comment) {
					$scope.Error = "请填写评论内容和评论人";
					return false;
				} else {
					$scope.addComment(articleData.articleId, $scope.comment)
				}
			}
			
			$scope.addComment = function(articleId, comment) {
				ArticleService
					.addCommentByArticleId(articleId, {
						author : comment.author,
						commentBody: comment.commentBody
					})
					.success(function(data) {
						console.log(data);
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