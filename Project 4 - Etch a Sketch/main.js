let userInput = 16;

const elements = {
	gridContainer: document.getElementById('main-content__grid-container'),
	slider: document.getElementById('grid-size-input'),
	sliderOutput: document.querySelector('.grid-size__output'),
	resetBtn: document.querySelector('#reset-button'),
};

const colorManagement = (color) => {
	const gridItems = document.querySelectorAll('.grid-item');

	gridItems.forEach((item) => {
		item.addEventListener('mouseenter', (event) => {
			event.target.style.setProperty('background-color', `${color}`);
		});
	});
};

const gridGenerate = (userInput) => {
	elements.gridContainer.style.setProperty('--grid-cols', userInput);
	elements.gridContainer.style.setProperty('--grid-rows', userInput);

	// Generate cells in grid
	const cellsNeeded = Math.pow(userInput, 2);
	let currentCells = 0;

	while (currentCells !== cellsNeeded) {
		const cell = document.createElement('div');
		cell.classList.add('grid-item');
		elements.gridContainer.appendChild(cell);
		currentCells++;
	}

	colorManagement('red');
};

const controlsInit = () => {
	elements.slider.oninput = () => {
		elements.sliderOutput.textContent = `Desired grid size: ${elements.slider.value} x ${elements.slider.value}`;
	};

	elements.slider.onmouseup = () => {
		userInput = elements.slider.value;
		elements.gridContainer.innerHTML = '';
		gridGenerate(userInput);
	};

	elements.resetBtn.addEventListener('click', () => {
		const cells = document.querySelectorAll('.grid-item');
		cells.forEach((cell) => {
			cell.style.setProperty('background-color', 'white');
		});
	});
};

gridGenerate(userInput);
controlsInit();
