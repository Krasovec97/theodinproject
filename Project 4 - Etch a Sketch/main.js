const userInput = 16;

const elements = {
	gridContainer: document.getElementById('grid-container'),
};

const gridGenerate = (userInput) => {
	const rows = Array.from(Array(userInput));
	const cols = Array.from(Array(userInput));
	const currentCells = 0;
	const cellsNeeded = rows.length * cols.length;

	elements.gridContainer.style.setProperty('--grid-cols', cols.length);
	elements.gridContainer.style.setProperty('--grid-rows', rows.length);

	const cellGenerate = (amount, current) => {
		while (current !== amount) {
			const cell = document.createElement('div');
			cell.classList.add('grid-item');
			elements.gridContainer.appendChild(cell);
			current++;
		}
	};

	cellGenerate(cellsNeeded, currentCells);
};

gridGenerate(userInput);
