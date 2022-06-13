currentValue = '';
previousValue = '';

const elements = {
	buttons: document.querySelectorAll('button'),
	outputCurrent: document.querySelector('.output__current'),
	outputHistory: document.querySelector('.output__history'),
};

const operate = (operator, num1, num2) => {
	switch (operator) {
		case 'add':
			return num1 + num2;

		case 'substract':
			return num1 - num2;

		case 'multiply':
			return num1 * num2;

		case 'divide':
			return num1 / num2;
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
		if (button.value === '=') {
			previousValue = currentValue;
		}

		currentValue += button.value;
		setOutput();
	});
};

calculatorLogic();
