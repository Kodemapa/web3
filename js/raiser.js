var app = angular.module("app", []);

app.controller("raiserController", function ($scope, $http) {

	$scope.raiserInfo = {};
	$scope.basic_info_entered={

		
	};

	$scope.funding_info_entered={
		
	};

	$scope.operation_info_entered={
		
	};
	$scope.category_info_entered={

	};
	

	$scope.show_values = function() {
		console.log("Startup Name:", $scope.basic_info_entered.Startup_Name);
		console.log("Founding Date:", $scope.basic_info_entered.Founding_Date);
		console.log("Website:", $scope.basic_info_entered.Website);

		console.log("Total Funding Amount(USD)", $scope.funding_info_entered.Total_Funding);
		console.log("Number of Funding Rounds", $scope.funding_info_entered.Number_of_Rounds);
		console.log("Age at First Funding Year", $scope.funding_info_entered.Age);

		console.log("Number of Miilestones Achieved", $scope.operation_info_entered.Operation);

		console.log("Startup Category", $scope.category_info_entered.Category);
		console.log("State Code", $scope.category_info_entered.Code);
		console.log("City", $scope.category_info_entered.City);

		
    };


	$http.get('../../raiser.json').then(function (response) {

		$scope.raiserInfo = response.data;

		
		$scope.basic_info = $scope.raiserInfo.basic_info;
		$scope.funding_info = $scope.raiserInfo.funding_info;
		$scope.operation_info = $scope.raiserInfo.operation_info;
		$scope.category_info = $scope.raiserInfo.category_info;
		

	},
		function (error) {
			// Handle error
			console.error('Error loading JSON:', error);
		});


	var form_1 = document.querySelector(".form_1");
	var form_2 = document.querySelector(".form_2");
	var form_3 = document.querySelector(".form_3");
	var form_4 = document.querySelector(".form_4");
	var form_5 = document.querySelector(".form_5");


	var form_1_btns = document.querySelector(".form_1_btns");
	var form_2_btns = document.querySelector(".form_2_btns");
	var form_3_btns = document.querySelector(".form_3_btns");
	var form_4_btns = document.querySelector(".form_4_btns");
	var form_5_btns = document.querySelector(".form_5_btns");


	var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
	var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
	var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");
	var form_3_back_btn = document.querySelector(".form_3_btns .btn_back");
	var form_3_next_btn = document.querySelector(".form_3_btns .btn_next");
	var form_4_back_btn = document.querySelector(".form_4_btns .btn_back");
	var form_4_next_btn = document.querySelector(".form_4_btns .btn_next");
	var form_5_back_btn = document.querySelector(".form_5_btns .btn_back");

	var form_2_progessbar = document.querySelector(".form_2_progessbar");
	var form_3_progessbar = document.querySelector(".form_3_progessbar");
	var form_4_progessbar = document.querySelector(".form_4_progessbar");
	var form_5_progessbar = document.querySelector(".form_5_progessbar");


	var btn_done = document.querySelector(".btn_done");
	var modal_wrapper = document.querySelector(".modal_wrapper");
	var shadow = document.querySelector(".shadow");

	form_1_next_btn.addEventListener("click", function () {
		form_1.style.display = "none";
		form_2.style.display = "block";

		form_1_btns.style.display = "none";
		form_2_btns.style.display = "flex";

		form_2_progessbar.classList.add("active");
	});

	form_2_back_btn.addEventListener("click", function () {
		form_1.style.display = "block";
		form_2.style.display = "none";

		form_1_btns.style.display = "flex";
		form_2_btns.style.display = "none";

		form_2_progessbar.classList.remove("active");
	});

	form_2_next_btn.addEventListener("click", function () {
		form_2.style.display = "none";
		form_3.style.display = "block";

		form_3_btns.style.display = "flex";
		form_2_btns.style.display = "none";

		form_3_progessbar.classList.add("active");
	});

	form_3_back_btn.addEventListener("click", function () {
		form_3.style.display = "none"; // Hide form_3
		form_2.style.display = "block"; // Show form_2
	
		form_3_btns.style.display = "none"; // Hide form_3 buttons
		form_2_btns.style.display = "flex"; // Show form_2 buttons
	
		form_3_progessbar.classList.remove("active"); // Deactivate form_3 progress bar
		form_2_progessbar.classList.add("active"); // Reactivate form_2 progress bar
	});

	form_3_next_btn.addEventListener("click", function () {
		form_3.style.display = "none";
		form_4.style.display = "block";
	
		form_3_btns.style.display = "none";
		form_4_btns.style.display = "flex";
	
		form_3_progessbar.classList.remove("active");
		form_4_progessbar.classList.add("active");
	});

	form_4_back_btn.addEventListener("click", function () {
		form_4.style.display = "none";
		form_3.style.display = "block";
	
		form_4_btns.style.display = "none";
		form_3_btns.style.display = "flex";
	
		form_4_progessbar.classList.remove("active");
		form_3_progessbar.classList.add("active");
	});

	form_4_next_btn.addEventListener("click", function () {
		form_4.style.display = "none";
		form_5.style.display = "block";
	
		form_4_btns.style.display = "none";
		form_5_btns.style.display = "flex";
	
		form_4_progessbar.classList.remove("active");
		
	});

	form_5_back_btn.addEventListener("click", function() {
		form_5.style.display = "none"; 
		form_4.style.display = "block"; 
		form_5_btns.style.display = "none"; 
		form_4_btns.style.display = "flex"; 

	});

	btn_done.addEventListener("click", function () {
		modal_wrapper.classList.add("active");
	})

	shadow.addEventListener("click", function () {
		modal_wrapper.classList.remove("active");
	})
});

