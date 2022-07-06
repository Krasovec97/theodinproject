let currentValue = "";
let previousValue = "";

let numOneToOperate = "";
let numTwoToOperate = "";

let previousOperator = "";
let previousResult = "";

const elements = {
	buttons: document.querySelectorAll("button"),
	outputCurrent: document.querySelector(".output__current"),
	outputHistory: document.querySelector(".output__history"),
};

const characters = ["+", "-", "/", "*", "C", "=", "AC"];

const operate = (num1, num2, operator, calcByOperator = false) => {
	let result = 0;

	if (num1 === "" || num2 === "") {
		num1 = 0;
		num2 = 0;
	}

	numOneToOperate = num1;
	numTwoToOperate = num2;

	switch (operator) {
		case "+":
			result = +num1 + +num2;
			break;

		case "-":
			result = +num1 - +num2;
			break;

		case "*":
			result = +num1 * +num2;
			break;

		case "/":
			if (parseFloat(num1) === 0 || parseFloat(num2) === 0) {
				elements.outputCurrent.innerHTML = "Syntax Error";
				elements.outputHistory.innerHTML = "Syntax Error";
				return;
			}
			result = +num1 / +num2;
			break;
	}

	previousResult = result;
	return toFiveDecimals(result);
};

const setOutput = (isCalc = false, calcByOperator = false) => {
	if (elements.outputCurrent.innerHTML === "Syntax Error") {
		return;
	}

	if (!isCalc) {
		elements.outputCurrent.innerText = toFiveDecimals(currentValue);
		elements.outputHistory.innerText = toFiveDecimals(previousValue);
	} else {
		if (calcByOperator) {
			elements.outputHistory.innerText = `${toFiveDecimals(numOneToOperate)} ${previousOperator}`;
			elements.outputCurrent.innerText = `${toFiveDecimals(currentValue)}`;
		} else {
			elements.outputHistory.innerText = `${toFiveDecimals(numOneToOperate)} ${previousOperator} ${toFiveDecimals(numTwoToOperate)} =`;
			elements.outputCurrent.innerText = `${toFiveDecimals(previousResult)}`;
		}
	}
};

const toFiveDecimals = (string) => {
	if (string === "") {
		return string;
	}

	if (parseFloat(string) % 1 === 0) {
		return string;
	} else {
		return parseFloat(string).toFixed(5);
	}
};

const calculatorLogic = () => {
	elements.buttons.forEach((button) => {
		buttonLogic(button);
	});
};

const calculate = (operator, resultWithOperator = false, calcByOperator) => {
	if (resultWithOperator) {
		if (calcByOperator) {
			if (!!previousValue) {
				numTwoToOperate = currentValue;
				previousValue = operate(numOneToOperate, numTwoToOperate, previousOperator);
				operate(previousValue, numTwoToOperate, previousOperator, true);
				currentValue = "";
			}
		}

		if (!numOneToOperate && !numTwoToOperate) {
			if (currentValue === "") {
				currentValue = 0;
			}

			numOneToOperate = currentValue;
			previousValue = `${toFiveDecimals(numOneToOperate)} ${operator}`;
			currentValue = "";
		}
	} else {
		if (!!previousValue) {
			numTwoToOperate = currentValue;
			if (!!numTwoToOperate) {
				operate(numOneToOperate, numTwoToOperate, previousOperator);
				setOutput(true, false);
			}
		}
	}

	previousOperator = operator;
};

const buttonLogic = (button) => {
	button.value = button.innerText;
	button.addEventListener("click", () => {
		// debugger;
		if (!characters.includes(button.value)) {
			if (button.value.includes(".") && currentValue.includes(".")) {
				return;
			}
			currentValue += button.value;
			setOutput();
		} else {
			switch (button.value) {
				case "=":
					calculate(previousOperator, false);
					break;
				case "AC":
					clearCalc();
					break;
				case "+":
					calculate("+", true, true);
					setOutput(true, true);
					break;
				case "-":
					calculate("-", true, true);
					setOutput(true, true);
					break;
				case "/":
					calculate("/", true, true);
					setOutput(true, true);
					break;
				case "*":
					calculate("*", true, true);
					setOutput(true, true);
					break;
				case "C":
					currentValue = "";
					setOutput();
					break;
			}
		}
	});
};

const clearCalc = () => {
	elements.outputCurrent.innerHTML = "";
	elements.outputHistory.innerHTML = "";
	currentValue = "";
	previousValue = "";
	numOneToOperate = "";
	numTwoToOperate = "";
	previousOperator = "";
	setOutput();
};

calculatorLogic();
