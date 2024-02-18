var app=angular.module("app",[])

app.controller("ControllerName",function($scope){
    //array of strings 
    const fs = require('fs');
    var jsonObject;
// Read the JSON file
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        // Parse the JSON data into a JavaScript object
         jsonObject = JSON.parse(data);

        // You can now use the jsonObject object in your code
        console.log(jsonObject);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});


    $scope.nav=[
    {
        href:"index.html",
        text:"Home",
    },
] 

$scope.pageInfo = jsonObject //read the json and convert it into list of objects
console.log("json",$scope.pageInfo)
$scope.hero =$scope.pageInfo.hero

});