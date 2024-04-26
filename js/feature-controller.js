var app = angular.module("app", []);

app.controller("projectController", function ($scope, $http) {

    $scope.projects = [];

    $http.get('../../registration.json')
        .then(function (response) {
            $scope.projects = response.data;
        })
        .catch(function (error) {
            console.error('Error loading JSON:', error);
        });

    $scope.fundProject = function (project) {
        console.log('Funding project:', project.startupName);
        // Logic to fund the project goes here
    };
});
