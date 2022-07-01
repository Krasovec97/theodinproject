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
			if (parseInt(num1) === 0 || parseInt(num2) === 0) {
				elements.outputCurrent.innerHTML = 'Syntax Error';
				elements.outputHistory.innerHTML = 'Syntax Error';
				return;
			}
			result = +num1 / +num2;
			break;
	}

	previousResult = result;
	return result;
};

const setOutput = (isCalc = false, calcByOperator = false) => {
	if (!isCalc) {
		elements.outputCurrent.innerText = currentValue;
		elements.outputHistory.innerText = previousValue;
	} else {
		if (calcByOperator) {
			elements.outputHistory.innerText = `${numOneToOperate} ${previousOperator} ${numTwoToOperate} =`;
			elements.outputCurrent.innerText = `${parseFloat(previousValue.toFixed(5))}`;
		} else {
			elements.outputHistory.innerText = `${numOneToOperate} ${previousOperator} ${numTwoToOperate} =`;
			elements.outputCurrent.innerText = `${parseFloat(previousResult.toFixed(5))}`;
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
		if (calcByOperator) {
			if (!!previousValue) {
				numTwoToOperate = currentValue;
				previousValue = operate(numOneToOperate, numTwoToOperate, previousOperator);
				operate(previousValue, numTwoToOperate, previousOperator, true);
				setOutput(true, calcByOperator);
				currentValue = '';
			}
		}

		if (!numOneToOperate && !numTwoToOperate) {
			numOneToOperate = currentValue;
			previousValue = `${numOneToOperate} ${operator}`;
			currentValue = '';
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
					break;
				case '-':
					calculate('-', true, true);
					break;
				case '/':
					calculate('/', true, true);
					break;
				case '*':
					calculate('*', true, true);
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
