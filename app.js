var MathApp = angular.module("Math", []);

function EquationFactory() {

	var maxOperationCount;

	function generateRandom(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	var total = 0;

	function calculateElementsTotal(obj) {
		if (obj.sign == "-")
		{ total -= obj.digit; }
		else
		{ total += obj.digit; }
	}

	function getTotal(arr) {
		total = 0;
		arr.forEach(function (obj) {
			calculateElementsTotal(obj);
		});
	}

	function getSign(opType) {
		//getOption to mix plus and minus
		//var sign = "";  
		if (opType == "MIXED") {
			if (generateRandom(1, 9) % 2 == 0) {
				return "+";
			}
			else {
				return "-";
			}
		}
		else {
			return opType == "ADD" ? "+" : "-";
		}

	}


	function eleEquation() {
		this.sign = "";
		this.digit = 0;
	}

	var newEle = new eleEquation();
	newEle.sign = getSign();
	newEle.digit = generateRandom(1, 9);

	var Equation = [];




	function outputEquation(maxOperationCount, opType) {

		var output = "";

		Equation.push({
			sign: "",
			digit: generateRandom(1, 9)
		});

		//for 3 elements
		for (var i = 0; i < generateRandom(1, maxOperationCount) ; i++) {
			var newEle = new eleEquation();
			newEle.sign = getSign(opType);

			if (newEle.sign == "-") {
				getTotal(Equation);
				newEle.digit = generateRandom(1, total);
			}
			else {
				//alert(newEle.sign);
				newEle.digit = generateRandom(1, 9);
			}
			Equation.push(newEle);
		}

		Equation.forEach(function (obj) {
			output += obj.sign + obj.digit;
		})

		Equation = [];

		console.log(output);

		return output;
	}

	//alert(output + "=");

	//still getting negative numbers...

	return {
		returnEquations: function (maxOperationCount, questionCount, opType) {
			//maxOperationCount = maxOperationCount;

			outputEquations = [];

			for (var i = 0; i < questionCount; i++) {
				outputEquations.push(outputEquation(maxOperationCount, opType) + "=");
			}

			return outputEquations;
		}

	}
}

MathApp.factory("MathAppFactory", EquationFactory);

MathApp.controller("MainCtrl", function ($scope, MathAppFactory, $window) {

	$scope.questionCount = 20;
	$scope.maxOperationCount = 3;
	$scope.opType = "MIXED";

	$scope.makeEquations = function () {
		$scope.Questions = MathAppFactory.returnEquations($scope.maxOperationCount, $scope.questionCount, $scope.opType);
	}

	$scope.makeEquations();


	$scope.setOperationType = function (opType) {
		$scope.opType = opType;
	}

	$scope.print = function () {
		$window.print();
	}

	$scope.content = "welcome.html";

	$scope.updateContent = function (pageURL)
	{
		$scope.content = pageURL;
	}
});