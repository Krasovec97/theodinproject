const userInput = 16;

const elements = {
	gridContainer: document.querySelector('.grid-container'),
};

const gridGenerate = (userInput) => {
	const rows = Array.from(Array(userInput));
	const cols = Array.from(Array(userInput));

	elements.gridContainer.setAttribute('--grid-rows', rows);
	elements.gridContainer.setAttribute('--grid-cols', cols);

	rows.forEach(() => {
		const cell = document.createElement('div');
		elements.gridContainer.appendChild(cell).className = 'grid-item';
	});

	cols.forEach(() => {
		const cell = document.createElement('div');
		elements.gridContainer.appendChild(cell).className = 'grid-item';
	});
};

gridGenerate(userInput);
