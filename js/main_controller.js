var app = angular.module("app", []);

app.controller("ControllerName", function ($scope, $http) {
    // Initialize $scope.pageInfo
    $scope.pageInfo = {};

    // Use $http service to load JSON data
    $http.get('data.json').then(function (response) {
        // Handle successful response
        $scope.pageInfo = response.data;
        // console.log("json", $scope.pageInfo);
        // Access the hero object
        $scope.nav=$scope.pageInfo.nav;
        $scope.hero = $scope.pageInfo.hero; 
        $scope.AboutUs=$scope.pageInfo.AboutUs;
        $scope.services=$scope.pageInfo.services; 
        $scope.whyChooseUs=$scope.pageInfo.whyChooseUs;
        $scope.projects=$scope.pageInfo.projects;
        $scope.OurProjects=$scope.pageInfo.OurProjects;
        if(OurProjects.length<8)
        {
            $scope.OurProjects=$scope.pageInfo.OurProjects.slice(0,length);
        }else{

            $scope.OurProjects=$scope.pageInfo.OurProjects.slice(0,8);
        }
        
              
    }, function (error) {
        // Handle error
        console.error('Error loading JSON:', error);
    });
});
