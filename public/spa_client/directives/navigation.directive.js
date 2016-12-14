(function() {
	angular
		.module('AnsonBlog')
		.directive('navigation', navigation)
		// .directive("ngRem", ['$document', function($document) {
		// 	return function(scope, element, attrs) {
		// 		// var ratio = 24/1280,
		// 		var ratio = 24/1920,
		// 			W = window.innerWidth,
		// 			HTML = $document[0].querySelector("html");
		// 		HTML.style.fontSize = ratio*W + 'px';
		// 	}
		// }])
		// .directive("changeBg", ['$window', function($window) {
		// 	var bannerHeight = 0;
		// 	$window.addEventListener("load", changeBgInit, false);
		// 	function changeBgInit() {
		// 		var banner = document.querySelector('.banner');
		// 		bannerHeight = banner.clientHeight;
		// 	}
		// 	return function(scope, element, attrs) {
		// 		$window.addEventListener("scroll", function() {
		// 			if($window.scrollY > bannerHeight) {
		// 				element.css("background-color", "#FFF");
		// 			} else {
		// 				element.css("background-color", "transparent");
		// 			}
		// 		}, false)
		// 	}
		// }])

		function navigation() {
			return {
				restrict: 'EA',
				templateUrl: 'spa_client/directives/navigation.template.html',
				controller: 'navigationCtrl'
			}
		}
})()
