let currentValue = '';
let previousValue = '';

let numOneToOperate = '';
let numTwoToOperate = '';

let previousOperator = '';
let previousResult = '';

const elements = {
	buttons: document.querySelectorAll('button'),
	outputCurrent: document.querySelector('.output__current'),
	outputHistory: document.querySelector('.output__history'),
};

const characters = ['+', '-', '/', '*', '+ / -', '=', 'AC'];

const operate = (num1, num2, operator, calcByOperator = false) => {
	let result = 0;
	numOneToOperate = num1;
	numTwoToOperate = num2;

	switch (operator) {
		case '+':
			result = +num1 + +num2;
			break;

		case '-':
			result = +num1 - +num2;
			break;

		case '*':
			result = +num1 * +num2;
			break;

		case '/':
			result = +num1 / +num2;
			break;
	}

	previousResult = result;
	setOutput(true, operator, result, calcByOperator);
	return result;
};

const setOutput = (isCalc = false, previousOperator, result, calcByOperator) => {
	if (!isCalc) {
		elements.outputCurrent.innerText = currentValue;
		elements.outputHistory.innerText = previousValue;
	} else {
		if (calcByOperator) {
			elements.outputHistory.innerText = `${previousResult} ${previousOperator} ${numOneToOperate} =`;
			elements.outputCurrent.innerText = `${previousResult}`;
		} else {
			elements.outputHistory.innerText = `${numOneToOperate} ${previousOperator} ${numTwoToOperate} =`;
			elements.outputCurrent.innerText = `${result}`;
		}
	}
};

const calculatorLogic = () => {
	elements.buttons.forEach((button) => {
		buttonLogic(button);
	});
};

const calculate = (operator, resultWithOperator = false, calcByOperator) => {
	if (resultWithOperator) {
		if (!numOneToOperate && !numTwoToOperate) {
			numOneToOperate = currentValue;
			console.log(`First num is = ${numOneToOperate}`);
			previousValue = `${numOneToOperate} ${operator}`;
			currentValue = '';
		} else if (calcByOperator) {
			if (!!previousValue) {
				numTwoToOperate = currentValue;
				previousValue = operate(numOneToOperate, numTwoToOperate, previousOperator);
				operate(previousValue, numTwoToOperate, previousOperator, true);
				currentValue = '';
			}
		} else {
			currentValue = '';
			previousValue = `${previousResult} ${operator}`;
			operate(previousResult, currentValue, previousOperator);
		}
	} else {
		if (!!previousValue) {
			numTwoToOperate = currentValue;
			if (!!numTwoToOperate) {
				operate(numOneToOperate, numTwoToOperate, previousOperator);
			}
		}
	}

	previousOperator = operator;
};

const buttonLogic = (button) => {
	button.value = button.innerText;

	button.addEventListener('click', () => {
		if (!characters.includes(button.value)) {
			currentValue += button.value;
			setOutput();
		} else {
			switch (button.value) {
				case '=':
					calculate(previousOperator, false);
					break;
				case 'AC':
					clearCalc();
					break;
				case '+':
					calculate('+', true, true);
					setOutput();
					break;
				case '-':
					calculate('-', true, true);
					setOutput();
					break;
				case '/':
					calculate('/', true, true);
					setOutput();
					break;
				case '*':
					calculate('*', true, true);
					setOutput();
					break;
				case '+ / -':
					break;
			}
		}
	});
};

const clearCalc = () => {
	currentValue = '';
	previousValue = '';
	numOneToOperate = '';
	numTwoToOperate = '';
	previousOperator = '';
	setOutput();
};

calculatorLogic();
