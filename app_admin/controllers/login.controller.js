(function() {
  angular
    .module('AnsonBlogAdmin')
    .constant('uploadUrl', '/upload')
    .controller('loginCtrl', longinController)
    .controller('mainCtrl', mainController)
    .controller('editCtrl', articleController)
    .directive('fileInput', fileInput)
    .directive('richTextEditor', richTextEditor)

    richTextEditor.$inject = ['$document', '$http']
    function richTextEditor($document, $http) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var publish = $document[0].getElementById('publish');
          var rteField = $document[0].getElementById('myTextArea');
          var content = richTextField.document.body.innerHTML;
          console.log(rteField);
          console.log(publish);
          console.log(content);
          angular.element(publish).on('click', function(event) {
            rteField.innerHTML = richTextField.document.body.innerHTML;
            console.log(rteField);
            console.log(scope.title);
            $http.post('/api/article', {
              title: scope.title,
              content: rteField.innerHTML
            })
          })
        }
      }
    }

    fileInput.$inject = ['$parse'];
    function fileInput($parse) {
      return {
				restrict: 'A',
				link: function(scope, elem, attrs) {
					function exposeData() {
						$parse(attrs.fileInput).assign(scope, elem[0].files);
						scope.$apply();
					}
					elem.on('change', exposeData)
				}
			}
    }

    articleController.$inject = ['$scope', '$location', '$document'];
    function articleController($scope, $location, $document) {
      $scope.isEditing = false;
      $scope.editFrameOn = function() {
        richTextField.document.designMode = 'on';
        $scope.isEditing = true;
      }
      $scope.editFrameOff = function() {
        richTextField.document.designMode = 'off';
        $scope.isEditing = false;
        // $document[0].elements['content'].innerHTML = richTextField.document.body.innerHTML;
      }
      $scope.editBold = function() {
        richTextField.document.execCommand('bold', false, null);
      }
      $scope.editItalic = function() {
        richTextField.document.execCommand('italic', false, null);
      }
      $scope.editUnderline = function() {
        richTextField.document.execCommand('underline', false, null);
      }
      $scope.editFontSize = function() {
        var size = prompt("输入字体大小：1-7", '');
        richTextField.document.execCommand('FontSize', false, size);
      }
      $scope.editForeColor = function() {
        var color = prompt("请输入字体颜色，英文字母或十六进制", "");
        richTextField.document.execCommand('ForeColor', false, color);
      }
      $scope.editInsertHorizontalRule = function() {
        richTextField.document.execCommand('inserthorizontalrule', false, null)
      }
      $scope.editLink = function(){
      	var linkURL = prompt("Enter the URL for this link:", "http://");
      	richTextField.document.execCommand("CreateLink", false, linkURL);
      }
      $scope.editImage = function() {
        var imgSrc = $scope.picUrl;
		    if(imgSrc != null){
		        richTextField.document.execCommand('insertimage', false, imgSrc);
		    }
      }
      $scope.editH1 = function() {
        richTextField.document.execCommand('formatBlock', false, 'H1');
      }
      $scope.editH2 = function() {
        richTextField.document.execCommand('formatBlock', false, 'H2');
      }
      $scope.editH3 = function() {
        richTextField.document.execCommand('formatBlock', false, 'H3');
      }
      $scope.editH4 = function() {
        richTextField.document.execCommand('formatBlock', false, 'H4');
      }
      $scope.editH5 = function() {
        richTextField.document.execCommand('formatBlock', false, 'H5');
      }
      $scope.editH6 = function() {
        richTextField.document.execCommand('formatBlock', false, 'H6');
      }
    }

    longinController.$inject = ['$scope', '$http', '$location', '$state'];
    function longinController($scope, $http, $location, $state) {
      var data = {
        username: $scope.username,
        password: $scope.password
      }

      $scope.authenticate = function(username, password) {
        $http.post('/login', {
          username: username,
          password: password
        }, {
          withCredentials: true
        }).success(function(data){
          $state.go('main');
        })
      }
    }

    mainController.$inject = ['$scope', '$http', 'uploadUrl'];
    function mainController($scope, $http, uploadUrl) {
      // propertiesand method for image upload
      $scope.isProcessing = false;

      $scope.imageUpload = function(event) {
				var files = event.target.files; //FileList object
	    		var file = files[files.length-1];
	    		$scope.file = file;
	    		console.log($scope.file); // name, size, type(MIME)
	    		var reader = new FileReader();
	    		reader.onload = $scope.imageIsLoaded;
	    		reader.readAsDataURL(file);
			}

      $scope.imageIsLoaded = function(e) {
				$scope.$apply(function() {
					// below will output FileReader
					// console.log(e.target);
					$scope.step = e.target.result;
				})
			}

      $scope.upload = function() {
        $scope.isProcessing = true;
        var fd = new FormData();
        fd.append('file', $scope.file);
        // fd.append('article', angular.toJson($scope.article));
        $http({
          method: 'POST',
          url: uploadUrl,
          data: fd,
          transformRequest: angular.identity,
          headers: {'content-type': undefined}
        })
        .success(function(response) {
          $scope.isProcessing = false;
          $scope.picUrl = response.url;
        })
        .error(function(error) {
          $scope.isProcessing = false;
        })

      }
      // properties and method for rte
      $scope.editMode = false;
      $scope.screens = ["文章", "用户"];
      $scope.current = $scope.screens[0];
      $scope.setScreen = function (index) {
        $scope.editMode = false;
        $scope.current = $scope.screens[index];
      };
      $scope.onEdit = function() {
        $scope.editMode = true;
      }
      $scope.getScreen = function () {
        return $scope.current == "文章"
          ? "/views/adminArticles.html" : "/views/adminUsers.html";
      };
    }
})()
