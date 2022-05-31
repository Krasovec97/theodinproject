let userInput = 16;

const elements = {
	gridContainer: document.querySelector('#main-content__grid-container'),
	slider: document.querySelector('#grid-size-input'),
	sliderOutput: document.querySelector('.grid-size__output'),
	resetBtn: document.querySelector('#reset-button'),
	rainbowBtn: document.querySelector('#rainbow-button'),
	colorPicker: document.querySelector('#color-pick-input'),
};

const colorManagement = (color, mode) => {
	const gridItems = document.querySelectorAll('.grid-item');

	if (mode === 'rainbow') {
		gridItems.forEach((item) => {
			item.addEventListener('mouseenter', (event) => {
				const randColor = randomColor();
				event.target.style.setProperty('background-color', `${randColor}`);
			});
		});
	} else {
		gridItems.forEach((item) => {
			item.addEventListener('mouseenter', (event) => {
				event.target.style.setProperty('background-color', `${color}`);
			});
		});
	}
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

	colorManagement('black');
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
		colorManagement('black');
	});

	elements.rainbowBtn.addEventListener('click', () => {
		colorManagement(randomColor(), 'rainbow');
	});

	elements.colorPicker.addEventListener('input', (e) => {
		console.log(e);
	});
};

const randomColor = () => {
	return (
		'#' +
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0')
			.toUpperCase()
	);
};

gridGenerate(userInput);
controlsInit();
