'use strict';

var myApp = angular.module('myApp', [ 'ngRoute', 'monospaced.qrcode' ]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/:text?', {templateUrl: 'views/canvas.html', controller: 'Canvas'});
    $routeProvider.otherwise({templateUrl: 'views/canvas.html', controller: 'Canvas'});
}]);
