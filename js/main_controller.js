var app = angular.module("app", []);

app.controller("ControllerName", function ($scope, $http) {
  // Initialize $scope.pageInfo
  $scope.pageInfo = {};

  // Use $http service to load JSON data
  $http.get("data.json").then(
    function (response) {
      // Handle successful response
      $scope.pageInfo = response.data;
      // console.log("json", $scope.pageInfo);
      // Access the hero object
      $scope.nav = $scope.pageInfo.nav;
      $scope.hero = $scope.pageInfo.hero;
      $scope.AboutUs = $scope.pageInfo.AboutUs;
      $scope.services = $scope.pageInfo.services;
      $scope.whyChooseUs = $scope.pageInfo.whyChooseUs;
      $scope.projects = $scope.pageInfo.projects;
    },
    
    function (error) {
      // Handle error
      console.error("Error loading JSON:", error);
    }
  );

  $http.get("http://127.0.0.1:5000/getProjects").then(
    function (response) {
      $scope.projectInfo = response.data.slice(0, 10);
      console.log("json", $scope.projectInfo);
    },
    
    function (error) {
      console.error("Error Loading JSON:", error);
    }
  );
  $http.get("http://127.0.0.1:5000/getCustomers").then(
    function (response) {
      // Assuming response.data contains the projects array directly
      $scope.projects = response.data;
      console.log($scope.projects);

      $scope.OurProjects = $scope.projects["users"].filter(function (project) {
        return project.isInvestor === true;
      });

      console.log($scope.OurProjects); // Log the filtered projects

      // Slice the OurProjects array to a maximum of 8 items
      if ($scope.OurProjects.length > 8) {
        $scope.OurProjects = $scope.OurProjects.slice(0, 8);
      }
    },
    function (error) {
      console.error("Error Loading JSON:", error);
    }
  );
});
