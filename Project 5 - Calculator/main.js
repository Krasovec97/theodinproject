currentValue = '';
previousValue = '';
numOneToOperate = '';
numTwoToOperate = '';

const elements = {
	buttons: document.querySelectorAll('button'),
	outputCurrent: document.querySelector('.output__current'),
	outputHistory: document.querySelector('.output__history'),
};

const characters = ['+', '-', '/', '*', '+ / -', '=', 'AC'];

const operate = (operator, num1, num2) => {
	switch (operator) {
		case '+':
			return +num1 + +num2;

		case '-':
			return +num1 - +num2;

		case '*':
			return +num1 * +num2;

		case '/':
			return +num1 / +num2;
	}
};

const setOutput = () => {
	elements.outputCurrent.innerText = currentValue;
	elements.outputHistory.innerText = previousValue;
};

const setNumbers = (num1, num2) => {
	numOneToOperate = num1;
	numTwoToOperate = num2;
	console.log(`First number: ${num1}, second ${num2}`);
};

const calculatorLogic = () => {
	elements.buttons.forEach((button) => {
		buttonLogic(button);
	});
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
					previousValue = currentValue;
					setOutput();
					break;
				case 'AC':
					clearCalc();
					break;
				case '+':
					setNumbers(currentValue);
					break;
			}
		}
	});
};

const clearCalc = () => {
	previousValue = '';
	currentValue = '';
	setOutput();
};

calculatorLogic();
