const userInput = 16;

const elements = {
	gridContainer: document.getElementById('grid-container'),
};

const gridGenerate = (userInput) => {
	const rows = Array.from(Array(userInput));
	const cols = Array.from(Array(userInput));

	elements.gridContainer.style.setProperty('--grid-cols', cols.length);
	elements.gridContainer.style.setProperty('--grid-rows', rows.length);

	const cellGenerate = () => {
		const cell = document.createElement('div');
		cell.classList.add('grid-item');
		elements.gridContainer.appendChild(cell);
	};

	cols.forEach(() => cellGenerate());
	rows.forEach(() => cellGenerate());
};

gridGenerate(userInput);
