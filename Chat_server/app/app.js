'use strict';


var myApp = angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
   /* 'myApp.face_login',*/
   /* 'ui.bootstrap',*/
   /* 'angularFileUpload',*/
    /*'ng-bootstrap-datepicker'*/
    //'ngAnimate'


]);




myApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider, $locationProvider) {

   // $httpProvider.interceptors.push('TokenInterceptor');
    /* We simply have added the TokenInterceptor */

    $routeProvider.when('/home', {
        templateUrl: './partials/home_test.html',
        controller: 'homeCtrl',
        access: {
            requiredLogin: false  /* Setting if the current route needs authentication  , in this case we really need it */
        }

    });


}]);




myApp.filter('searchFor', function(){

    // All filters must return a function. The first parameter
    // is the data that is to be filtered, and the second is an
    // argument that may be passed with a colon (searchFor:searchString)

    return function(arr, searchString){

        if(!searchString){
            return arr;
        }

        var result = [];

        searchString = searchString.toLowerCase();

        // Using the forEach helper method to loop through the array
        angular.forEach(arr, function(item){

            if(item.name.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }

        });

        return result;
    };

});






myApp.directive('ng-keyup', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

/*
 * We set up a few session variables to keep a track of user’s session.
 * These variables are stored both in memory as well as browser’s session storage
 * (in case of a full page refresh we do not want the user to login again).
 * */
myApp.run(function ($rootScope, $window, $location) {

    /*   /!* when the page refreshes, check if the user is already logged in*!/
     $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
     /!* if the user tracks not exist in the browser session or in the memory *!/
     var is_logged = $window.localStorage.getItem("isLogged");
     if ((nextRoute.access && nextRoute.access.requiredLogin) && !is_logged) {
     $location.path("/login");
     }
     });
     $rootScope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {

     $rootScope.role = AuthenticationFactory.userRole;
     /!*if the user is already logged in, take him to the home page*!/
     if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
     $location.path('/home');

     }
     });
    AuthenticationFactory.check();
     */
});


/*
 * TokenInterceptor:
 * This factory is responsible for sending in the access token and the key along with each request to the server.
 * */
myApp.factory('TokenInterceptor', function ($q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                /* add the token to the header*/
                config.headers['X-Key'] = $window.sessionStorage.user;
                /* add the username  to the header*/
                config.headers['Content-Type'] = "application/json";
            }
            return config || $q.when(config);
            /*we can return a single value or promise*/
        },

        response: function (response) {
            return response || $q.when(response);
        }
    };
});


myApp.directive('collapseToggler', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.on('click', function() {
                $(this).siblings('.collapse').toggleClass('in');
            });
        }
    };
})

myApp.filter('String_limit', ['$filter', function($filter) {
    return function(input, limit) {
        if (! input) return;
        if (input.length <= limit) {
            return input;
        }

        return $filter('limitTo')(input, limit) + '...[lire la Suite]';
    };
}]);

myApp.factory('socket', function ($rootScope) {
  /*  var socket = io.connect('http://localhost:3000');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }
    };*/
});


myApp.filter('reverse', function () {
    return function (input, uppercase) {
        input = input || '';
        var out = "";
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        // conditional based on optional argument
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    };
});

myApp.constant('myconfig', {
    'developper': "grine med amine",
    'Super_User': "amine",
    'host': 'http://localhost:3000/',
    'logo': "www.google.tn/logo.jpeg",
    'version': "0.0.0.1"


});


