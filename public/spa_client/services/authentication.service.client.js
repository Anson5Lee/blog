(function() {
	angular
		.module('AnsonBlog')
		.factory('AuthenticationService', authentication)

		authentication.$inject = ['$window', '$http'];
		function authentication($window, $http) {
			return {
				saveToken: saveToken,
				getToken: getToken,
				register: register,
				login: login,
				logout: logout,
				isLoggedIn: isLoggedIn,
				currentUser: currentUser
			}

			function saveToken(token) {
				$window.localStorage['Blog-Token'] = token;
			}

			function getToken(token) {
				return $window.localStorage['Blog-Token'];
			}

			function register(user) {
				return $http.post('/api/user/register', user).success(function(data) {
					saveToken(data.token);
				})
			}

			function login(user) {
				return $http.post('/api/user/login', user).success(function(data) {
					saveToken(data.token);
				})
			}

			function logout(user) {
				$window.localStorage.removeItem('Blog-Token');
			}

			function isLoggedIn() {
				var token = getToken();
				if (token) {
					var payload = JSON.parse($window.atob(token.split('.')[1]));
					return payload.exp > Date.now() / 1000;
				} else {
					return false;
				}
			}

			function currentUser() {
				if (isLoggedIn()) {
					var token = getToken();
					var payload = JSON.parse($window.atob(token.split('.')[1]));
					return {
						email: payload.email,
						name: payload.name
					}
				}
			}
		}
})()
