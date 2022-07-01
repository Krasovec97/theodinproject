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
			if (parseInt(num1) === 0 || parseInt(num2) === 0) {
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

	if (parseInt(string) % 1 === 0) {
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
		if (!characters.includes(button.value)) {
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
	currentValue = "";
	previousValue = "";
	numOneToOperate = "";
	numTwoToOperate = "";
	previousOperator = "";
	setOutput();
};

calculatorLogic();
