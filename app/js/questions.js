'use strict';

angular.module('questions', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/questions', {
            templateUrl: 'html/questions.html',
            controller: 'QuestionsCtrl'
        });
    }])

    .controller('QuestionsCtrl', ['$scope', '$location', 'JsonFactory', 'finalResultsService', 'themeManagerService',
        function ($scope, $location, JsonFactory, finalResultsService, themeManagerService) {

            $scope.currentTheme = themeManagerService.getTheme();
            if ($scope.currentTheme == null) {
                $location.path('/welcome');
                return;
            }
            var description;
            var questions;
            //Chosen answers data
            var finalResults = {};
            var currentQuestionNum = 0;

            //Get the data from the Json file
            JsonFactory.get().then(function (json) {
                $scope.title = json.data.title;
                $scope.subtitle = json.data.subtitle;
                questions = json.data.questions;
                //Choose randomly a description between the two descriptions available
                description = json.data.description[Math.floor(Math.random() + 0.5)];

                //Initialize the questions data
                $scope.currentQuestion = questions[currentQuestionNum];
                $scope.lastQuestion = questions.length == 1;
            });

            //Gets called when the user clicks on the submit button
            $scope.enterAnswer = function () {
                //Adds the chosen option to the final results
                finalResults[currentQuestionNum] = {
                    question: $scope.currentQuestion.q,
                    chosenOption: $scope.optionInput
                };
                $scope.optionInput = undefined; //Resets the radio input
                if ($scope.lastQuestion) {
                    //Send the final results and go to summery
                    finalResults.description = description;
                    finalResultsService.addResults(finalResults);
                    $location.path('/summery');
                } else {
                    currentQuestionNum++;
                    $scope.currentQuestion = questions[currentQuestionNum];
                    $scope.lastQuestion = currentQuestionNum + 1 == questions.length;
                }
            };

        }]);