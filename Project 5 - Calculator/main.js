currentValue = '';
previousValue = '';

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
		}

		switch (button.value) {
			case '=':
				previousValue = currentValue;
				setOutput();
				break;
			case 'AC':
				previousValue = '';
				currentValue = '';
				setOutput();
		}
	});
};

calculatorLogic();
