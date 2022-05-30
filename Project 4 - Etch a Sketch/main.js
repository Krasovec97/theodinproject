let userInput = 16;

const elements = {
	gridContainer: document.getElementById('main-content__grid-container'),
	slider: document.getElementById('grid-size-input'),
	sliderOutput: document.querySelector('.grid-size__output'),
};

const gridGenerate = (userInput) => {
	elements.gridContainer.style.setProperty('--grid-cols', userInput);
	elements.gridContainer.style.setProperty('--grid-rows', userInput);

	// Generate cells in grid
	const cellsNeeded = userInput * userInput;
	let currentCells = 0;

	while (currentCells !== cellsNeeded) {
		const cell = document.createElement('div');
		cell.classList.add('grid-item');
		elements.gridContainer.appendChild(cell);
		currentCells++;
	}
};

elements.slider.oninput = () => {
	elements.sliderOutput.textContent = `Desired grid size: ${elements.slider.value} x ${elements.slider.value}`;
};

elements.slider.onmouseup = () => {
	userInput = elements.slider.value;
	elements.gridContainer.innerHTML = '';
	gridGenerate(userInput);
};

gridGenerate(userInput);
