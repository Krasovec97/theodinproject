const userInput = 16;

const elements = {
	gridContainer: document.getElementById('main-content__grid-container'),
};

const gridGenerate = (userInput) => {
	const rows = Array.from(Array(userInput));
	const cols = Array.from(Array(userInput));

	elements.gridContainer.style.setProperty('--grid-cols', cols.length);
	elements.gridContainer.style.setProperty('--grid-rows', rows.length);

	// Generate cells in grid
	const cellsNeeded = rows.length * cols.length;
	let currentCells = 0;

	while (currentCells !== cellsNeeded) {
		const cell = document.createElement('div');
		cell.classList.add('grid-item');
		elements.gridContainer.appendChild(cell);
		currentCells++;
	}
};

gridGenerate(userInput);
