(function() {
	angular
		.module('AnsonBlog')
		.directive('navigation', navigation);

		function navigation() {
			return {
				restrict: 'EA',
				templateUrl: '/directives/navigation.template.html'
			}
		}
})()