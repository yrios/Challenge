var challengeApp = angular.module('challengeApp', [
  'ngRoute',
  'chieffancypants.loadingBar',
  'ui.bootstrap'
]);

var operations;
challengeApp.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
});
 
challengeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'templates/login.php',
        controller: 'mainCtrl',
        isSecured: false
      }).
      when('/register', {
        templateUrl: 'templates/new_user.php',
        controller: 'userCtrl',
        isSecured: false
      }).
      when('/main', {
        templateUrl: 'templates/main.php',
        controller: 'blogCtrl',
        isSecured: true
      }).
      when('/entry/create', {
        templateUrl: 'templates/new_entry.php',
        controller: 'entryCtrl',
        isSecured: true
      }).
      when('/entry/edit', {
        templateUrl: 'templates/edit_entry.php',
        controller: 'editEntryCtrl',
        isSecured: true
      }).
      when('/main/:username', {
        templateUrl: 'templates/profile_page.php',
        controller: 'profileCtrl',
        isSecured: true
      }).
      when('/login/:username', {
        templateUrl: 'templates/user.php',
        controller: 'userBlogCtrl',
        isSecured: false
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]).run( function($rootScope, $location, UserSession) {
        //Listener para monitorear el cambio de ruta de la aplicacion
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          if(next.isSecured && !UserSession.isLogged()){
            $location.path("/login");
          }else if((next.originalPath == "/login" || next.originalPath == "/login/:username" || next.originalPath == "/register") && UserSession.isLogged()){
                $location.path("/main")
          }
        })         
      });