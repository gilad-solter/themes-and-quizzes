'use strict';

angular.module('summery', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/summery', {
            templateUrl: 'html/summery.html',
            controller: 'SummeryCtrl'
        });
    }])

    .controller('SummeryCtrl', ['$scope', 'finalResultsService', '$location', 'themeManagerService',
        function ($scope, finalResultsService, $location, themeManagerService) {
            $scope.currentTheme = themeManagerService.getTheme();
            if ($scope.currentTheme == null) {
                $location.path('/welcome');
                return;
            }

            $scope.finalResults = finalResultsService.getResults();
        }]);