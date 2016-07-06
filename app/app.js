'use strict';

angular.module('App', [
        'ngRoute',
        'ngMaterial',
        'angular.css.injector',
        'welcome',
        'questions',
        'summery'
    ])

    .config(['$locationProvider', '$routeProvider', '$mdThemingProvider',
        function ($locationProvider, $routeProvider, $mdThemingProvider) {
            $routeProvider.otherwise({redirectTo: '/welcome'});
            //Sets the color pallets for the different themes
            $mdThemingProvider.theme('got')
                .primaryPalette('brown');
            $mdThemingProvider.theme('pizza')
                .primaryPalette('deep-orange');
        }])

    //Factory to get the data from the json files
    .factory('JsonFactory', function ($http, themeManagerService) {
        return {
            get: function () {
                return $http.get('./data/' + themeManagerService.getTheme() + '.json');
            }
        };
    })

    //Managing the different themes
    .service('themeManagerService', function (cssInjector) {
        const THEMES = ['got','pizza'];
        var currentTheme = null;
        var setTheme = function (theme) {
            currentTheme = theme;
            cssInjector.add(('./css/' + theme + '.css'));
        };
        var getTheme = function () {
            return currentTheme;
        };
        var clearTheme = function () {
            cssInjector.removeAll();
        };
        var getThemes = function(){
            return THEMES;
        };
        return {
            setTheme: setTheme,
            getTheme: getTheme,
            clearTheme: clearTheme,
            getThemes: getThemes
        }
    })

    //Helper service to transfer the results from the questions section to the summery section
    .service('finalResultsService', function () {
        var finalResults = {};
        var addFinalResults = function (options) {
            finalResults = options;
        };
        var getFinalResults = function () {
            return finalResults;
        };
        return {
            addResults: addFinalResults,
            getResults: getFinalResults
        }
    })

    //The start over button that restarts the app
    .directive('startOverButtonDir', function ($location, themeManagerService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            link: function ($scope) {
                $scope.startOver = function () {
                    themeManagerService.clearTheme();
                    $location.path('/welcome');
                };
            },
            templateUrl: 'html/startOverButtonDir.html'
        }
    });
