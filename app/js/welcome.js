'use strict';

angular.module('welcome', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: 'html/welcome.html',
            controller: 'WelcomeCtrl'
        });
    }])

    .controller('WelcomeCtrl', ['$scope', 'themeManagerService',
        function ($scope, themeManagerService) {
        $scope.themes = themeManagerService.getThemes();

        $scope.setTheme = function (theme){
            themeManagerService.setTheme(theme);
        };

    }]);