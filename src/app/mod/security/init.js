angular.module("rms.mod.security", [
    'ui.router',
    'ngCookies'
  ])

  .factory('Auth', function ($cookieStore) {
    var _user = $cookieStore.get('user');

    var setUser = function (user) {
      if (!user.role || user.role < 0) {
        user.role = 0;
      }

      _user = user;
      $cookieStore.put('user', _user);
    };

    return {
      isAuthorized: function (level) {
        if (_user instanceof Object) {
          return _user.role >= level;
        }
        else {
          return false;
        }
      },
      setUser: setUser,
      isLoggedIn: function () {
        return _user ? true : false;
      },
      getUser: function () {
        return _user;
      },
      getId: function () {
        return _user ? _user.id : null;
      },
      getToken: function () {
        return _user ? _user.token : '';
      },
      logout: function () {
        $cookieStore.remove('user');
        _user = null;
      }
    };
  }
)

  .config(function ($httpProvider) {
    //Interceptor
    var interceptor = function ($q, $response, Auth) {
      //Intergate the interceptor for $http
      $httpProvider.interceptors.push(interceptor);

      return {
        'response': function (resp) {
          if (resp.config.url == '/api/login') {
            Auth.setToken(resp.data.token);
          }
        },
        'responseError': function (rejection) {
          switch (rejection.status) {
            case 401:
              if (rejection.config.url !== '/api/login') {
                $rootScope.$broadcast('auth:loginRequired');
              }
              break;
            case 403:
              $rootScope.$broadcast('auth:forbidden');
              break;
            case 404:
              $rootScope.$broadcast('page:notfound');
              break;
            case 500:
              $rootScope.$broadcast('server:error');
              break;
          }
          return $q.reject(rejection);
        }
      };//end return
    };

  })

  .run(function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (!Auth.isAuthorized(toState.access_level)) {
        if (Auth.isLoggedIn()) {
          $state.go('kkk');
          event.preventDefault();
        } else {
          //$state.transitionTo('login');
          //event.preventDefault();
        }
      }
    });
  });