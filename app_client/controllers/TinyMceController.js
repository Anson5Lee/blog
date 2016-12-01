(function() {
	angular
		.module('AnsonBlog')
		.controller('TinyMceController', TinyMceController)

		function TinyMceController($scope) {
			$scope.tinymceModel = 'Initial content';

			$scope.getContent = function() {
				console.log('Editor content:', $scope.tinymceModel);
			};

			$scope.setContent = function() {
			$scope.tinymceModel = 'Time: ' + (new Date());
			};

			$scope.tinymceOptions = {
				// plugins: 'link code',
				toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
			};
		}
})()