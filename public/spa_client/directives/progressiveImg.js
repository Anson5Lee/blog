(function(){
  angular
    .module('AnsonBlog')
    .directive('progressiveImg', progressiveImg)

    function progressiveImg() {
      return {
        restrict: "A",
        scope: {
          placeHolder: "=",
          imageSrc: "="
        },
        templateUrl: 'spa_client/directives/progressiveImg-tpl.html',
        // compile: function(tElement, tAttributes) {

        link: function(iScope, iElement, iAttrs) {
            // console.log(iScope);
            // console.log(iScope.placeHolder);
            // console.log(iScope.imageSrc);
            var component = iElement.children().children('.ProgressiveMedia');
            var canvas = component.children('.ProgressiveMedia-canvas')[0];
            var thumbnail = angular.element(new Image());
            component.append(thumbnail);
            thumbnail.on('load', function() {
              var context = canvas.getContext("2d");
              context.drawImage(thumbnail[0], 0, 0, canvas.width, canvas.height);
              StackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, 9);
            });
            thumbnail.addClass('ProgressiveMedia-thumbnail');
            thumbnail.attr('crossorigin', 'anonymous');
            thumbnail.attr('src', iScope.placeHolder);

            var image = angular.element(new Image());
            component.append(image);
            image.on('load', function() {
              image.addClass('isLoaded');
              angular.element(canvas).attr('display', 'none');
            })
            image.addClass('ProgressiveMedia-image');
            image.attr('src', iScope.imageSrc);
          }
        // }
      }
    }
})()
