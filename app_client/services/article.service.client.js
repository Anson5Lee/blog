(function() {
	angular
		.module('AnsonBlog')
		.factory('ArticleService', ArticleService)

		function ArticleService($http) {
			return {
				getAllArticles: getAllArticles,
				getArticleById: getArticleById,
				addCommentByArticleId: addCommentByArticleId
			}			

			function getAllArticles() {
				return $http.get('/api/article');
			}
			function getArticleById(id) {
				return $http.get('/api/article/' + id);
			}
			function addCommentByArticleId(id, data) {
				return $http.post('/api/article/' + id + '/comment', data);
			}

		}
})()