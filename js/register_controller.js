var app = angular.module("registrationApp", []);

app.controller("registrationController", function ($scope, $http) {
  $scope.user = {};
  $scope.PasswordError = false;

  $scope.submitForm = function () {
    createUserObj();
  };

  var createUserObj = function () {
    $scope.registered_data_entered = {};
    $scope.registrationData = {};
    $scope.registered_data_entered = {
      Email: $scope.user.email,
      First_name: $scope.user.fullName,
      // "Last_Name":"Sai",
      Password: $scope.user.password,
      registeras: $scope.user.type,
    };
    $http
      .post("http://127.0.0.1:5000/signup", $scope.registered_data_entered)
      .then(function (response) {
        console.log("User added successfully");
      })
      .catch(function (error) {
        console.error("Error adding user: ", error);
      });
  };
});
