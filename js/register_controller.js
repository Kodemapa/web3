var app = angular.module("registrationApp", []);

app.controller("registrationController", function ($scope, $http) {
  $scope.user = {};
  $scope.PasswordError = false;

  $scope.submitForm = function () {
    $http.get("../../Dummy/User.json").then((response) => {
      var userData = response.data; // Make sure this path is correct
      var userFound = userData.users.some(
        (user) =>
          user.Email === $scope.user.email &&
          user.Password === $scope.user.password
      );

      if (!userFound) {
        createUserObj(userData);
        $scope.PasswordError = false;
        window.location.href = "index.html"; // Changed to redirect in the same window/tab
      } else {
        $scope.PasswordError = true;
      }
    });
  };

  var createUserObj = function (userData) {
    userData.users.push({
      FullName: $scope.user.fullName,
      Email: $scope.user.email,
      Password: $scope.user.password,
    });

    // Send updated user data to server or update local storage
    // Example:
    $http.post("../../Dummy/User.json", userData).then(function(response) {
      console.log("User added successfully");
    }).catch(function(error) {
      console.error("Error adding user: ", error);
    });
  };
});
