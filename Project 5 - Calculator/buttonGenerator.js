const elements = {
	calculatorBody: document.querySelector('.calculator-body'),
	calculatorNumpads: document.querySelector('.calculator-body__numpad'),
	calculatorOperators: document.querySelector('.calculator-body__operators'),
};

const numpadGenerator = () => {
	let numberGrid = Array.from({ length: 11 }, (value, index) => index);

	numberGrid.forEach((element, index) => {
		let button = document.createElement('button');
		const buttonManage = setButtons(index, button);
		button.id = `btn${index}`;
		button.classList.add('btn');
		elements.calculatorNumpads.appendChild(button);
	});
};

const setButtons = (index, button) => {
	switch (index) {
		case 0:
			return (button.textContent = '7');
		case 1:
			return (button.textContent = '8');
		case 2:
			return (button.textContent = '9');
		case 3:
			return (button.textContent = '4');
		case 4:
			return (button.textContent = '5');
		case 5:
			return (button.textContent = '6');
		case 6:
			return (button.textContent = '1');
		case 7:
			return (button.textContent = '2');
		case 8:
			return (button.textContent = '3');
		case 9:
			return (button.textContent = '0');
		case 10:
			return (button.textContent = '=');
	}
};

numpadGenerator();
