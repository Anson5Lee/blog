(function() {
	 angular
    	.module('AnsonBlog')
    	.filter('addHtmlLineBreaks', addHtmlLineBreaks)
			.filter('limitHtml', limitHtml)

		function addHtmlLineBreaks () {
			return function (text) {
			  var output = text.replace(/\n/g, '<br/>');
			  return output;
			};
		}
		
		limitHtml.$inject = ['$sce'];
		function limitHtml($sce) {
			return function(text, limit) {
				// console.log('HTML: ', text);
				var changedString = String(text).replace(/<[^>]+>/gm, '');
				// console.log('text: ', changedString);
        var length = changedString.length;
        return $sce.trustAsHtml(changedString.length > limit ? changedString.substr(0, limit - 1) : changedString);
    	}
		}

})()
