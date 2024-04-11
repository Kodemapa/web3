var app = angular.module("app", []);

app.controller("loginController", function ($scope, $http) {
  $scope.loginInfo = {};
  $scope.PasswordError = false;
  $scope.login_info_entered = {
    Email: "",
    Password: "",
  };

  $scope.Submit = function () {
    $http.get("../login.json").then((response) => {
      var userData = response.data; // Make sure this path is correct
      var userFound = userData.users.some(
        (user) =>
          user.Email === $scope.login_info_entered.Email &&
          user.Password === $scope.login_info_entered.Password
      );

      if (userFound) {
        creatingUserObj(userData);
        $scope.PasswordError = false;
        window.location.href = "main.html"; // Changed to redirect in the same window/tab
      } else {
        $scope.PasswordError = true;
      }
    });
  };

  var creatingUserObj = function (userData) {
    let users = userData.users.filter(
      (user) =>
        user.Email === $scope.login_info_entered.Email &&
        user.Password === $scope.login_info_entered.Password
    );
    localStorage.setItem("loggedInUser", JSON.stringify(users[0]));
  };
});
