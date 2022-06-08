const elements = {
	calculatorBody: document.querySelector('.calculator-body'),
	calculatorNumpads: document.querySelector('.calculator-body__numpad'),
	calculatorOperators: document.querySelector('.calculator-body__operators'),
};

const generateGrid = () => {
	let grid = Array.from({ length: 16 }, (value, index) => index);

	grid.forEach((element, index) => {
		let button = document.createElement('button');
		button.textContent = index;
		button.id = index;
		elements.calculatorBody.appendChild(button);
	});
};

generateGrid();
