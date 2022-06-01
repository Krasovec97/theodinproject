let userInput = 16;
let mode = '';
let color = '';

const elements = {
	gridContainer: document.querySelector('#main-content__grid-container'),
	slider: document.querySelector('#grid-size-input'),
	sliderOutput: document.querySelector('.grid-size__output'),
	resetBtn: document.querySelector('#reset-button'),
	darkenBtn: document.querySelector('#darken-button'),
	lightenBtn: document.querySelector('#lighten-button'),
	rainbowBtn: document.querySelector('#rainbow-button'),
	colorPicker: document.querySelector('#color-pick-input'),
};

const modeManager = (colorToSet = 'black', modeToSet = '') => {
	color = colorToSet;
	mode = modeToSet;
};

const setColorManagement = () => {
	const gridItems = document.querySelectorAll('.grid-item');

	gridItems.forEach((item) => {
		let called = 0;
		item.addEventListener('mouseenter', (event) => {
			switch (mode) {
				case 'rainbow':
					const randColor = randomColor();
					event.target.style.setProperty('background-color', `${randColor}`);
					break;

				case 'darken':
					console.log('darken');
					break;

				default:
					event.target.style.setProperty('background-color', `${color}`);
					break;
			}
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

	modeManager();
	setColorManagement();
};

const controlsInit = () => {
	elements.slider.addEventListener('input', () => {
		elements.sliderOutput.textContent = `Desired grid size: ${elements.slider.value} x ${elements.slider.value}`;
	});

	elements.slider.addEventListener('mouseup', () => {
		userInput = elements.slider.value;
		elements.gridContainer.innerHTML = '';
		gridGenerate(userInput);
	});

	elements.resetBtn.addEventListener('click', () => {
		const cells = document.querySelectorAll('.grid-item');
		cells.forEach((cell) => {
			cell.style.setProperty('background-color', 'white');
		});
		modeManager();
	});

	elements.rainbowBtn.addEventListener('click', () => {
		modeManager(randomColor(), 'rainbow');
	});

	elements.darkenBtn.addEventListener('click', () => {
		modeManager('black', 'darken');
	});

	elements.colorPicker.addEventListener('input', () => {
		modeManager(elements.colorPicker.value);
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
