currentValue = '';
previousValue = '';

numOneToOperate = '';
numTwoToOperate = '';

previousOperator = '';
previousResult = '';

const elements = {
	buttons: document.querySelectorAll('button'),
	outputCurrent: document.querySelector('.output__current'),
	outputHistory: document.querySelector('.output__history'),
};

const characters = ['+', '-', '/', '*', '+ / -', '=', 'AC'];

const operate = (num1, num2, operator) => {
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

	setOutput(true, operator, result);
	return result;
};

const setOutput = (isCalc = false, previousOperator, result) => {
	if (!isCalc) {
		elements.outputCurrent.innerText = currentValue;
		elements.outputHistory.innerText = previousValue;
	} else {
		elements.outputHistory.innerText = `${numOneToOperate} ${previousOperator} ${numTwoToOperate} =`;
		elements.outputCurrent.innerText = `${result}`;
	}
};

const calculatorLogic = () => {
	elements.buttons.forEach((button) => {
		buttonLogic(button);
	});
};

const calculate = (operator, resultWithOperator = false) => {
	previousOperator = operator;

	if (resultWithOperator) {
		if (!numOneToOperate && !numTwoToOperate) {
			numOneToOperate = currentValue;
			previousValue = `${numOneToOperate} ${operator}`;
			currentValue = '';
		} else if (!!previousValue) {
			console.log('I-ve been called');
		} else {
			currentValue = '';
			previousValue = `${previousResult} ${operator}`;
			operate(previousResult, currentValue, previousOperator);
		}
	} else {
		if (!!previousValue) {
			numTwoToOperate = currentValue;
			if (!!numTwoToOperate) {
				previousResult = operate(numOneToOperate, numTwoToOperate, previousOperator);
			}
		}
	}
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
					calculate('+', true);
					break;
				case '-':
					calculate('-', true);
					setOutput();
					break;
				case '/':
					calculate('/', true);
					setOutput();
					break;
				case '*':
					calculate('*', true);
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
