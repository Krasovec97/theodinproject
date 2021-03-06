let userInput = 16;
let mode = '';
let color = 'rgba(0, 0, 0, 0)';
let currentColor = '';

const elements = {
	gridContainer: document.querySelector('#main-content__grid-container'),
	slider: document.querySelector('#grid-size-input'),
	sliderOutput: document.querySelector('.grid-size__output'),
	resetBtn: document.querySelector('#reset-button'),
	darkenBtn: document.querySelector('#darken-button'),
	lightenBtn: document.querySelector('#lighten-button'),
	rainbowBtn: document.querySelector('#rainbow-button'),
	eraserBtn: document.querySelector('#eraser-button'),
	colorPicker: document.querySelector('#color-pick-input'),
};

const modeManager = (colorToSet = 'rgba(0, 0, 0, 1)', modeToSet = '') => {
	color = colorToSet;
	mode = modeToSet;
};

const opacityManager = (getItem, opacityToSet) => {
	getItem.style.setProperty('opacity', opacityToSet);
};

const setColorManagement = () => {
	const gridItems = document.querySelectorAll('.grid-item');

	gridItems.forEach((item) => {
		item.addEventListener('mouseenter', (event) => {
			const backgroundColor = rgbToObject(event.target.style.backgroundColor);
			const { red, green, blue } = rgbToObject(event.target.style.backgroundColor);

			let alphaToNum = parseFloat(backgroundColor.alpha);

			const darkenColor = `rgba(${red}, ${green}, ${blue}, ${alphaManager(alphaToNum, true)})`;
			const lightenColor = `rgba(${red}, ${green}, ${blue}, ${alphaManager(alphaToNum, false, backgroundColor)})`;

			switch (mode) {
				case 'rainbow':
					color = randomColor();
					break;

				case 'darken':
					color = darkenColor;
					break;

				case 'lighten':
					color = lightenColor;
					break;

				default:
					color = color;
					break;
			}

			event.target.style.setProperty('background-color', color);
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
		cell.style.backgroundColor = 'rgba(0, 0, 0, 0)';
		elements.gridContainer.appendChild(cell);
		currentCells++;
	}

	modeManager();
	setColorManagement();
};

const controlsInit = () => {
	// Grid Size
	elements.slider.addEventListener('input', () => {
		elements.sliderOutput.textContent = `Desired grid size: ${elements.slider.value} x ${elements.slider.value}`;
	});

	elements.slider.addEventListener('mouseup', () => {
		userInput = elements.slider.value;
		elements.gridContainer.innerHTML = '';
		gridGenerate(userInput);
	});

	// Buttons
	elements.resetBtn.addEventListener('click', () => {
		const cells = document.querySelectorAll('.grid-item');
		cells.forEach((cell) => {
			cell.style.setProperty('background-color', 'rgba(0, 0, 0, 0)');
		});
		modeManager(currentColor);
	});

	elements.rainbowBtn.addEventListener('click', () => {
		currentColor = randomColor();
		modeManager(currentColor, 'rainbow');
	});

	elements.darkenBtn.addEventListener('click', () => {
		modeManager(currentColor, 'darken');
	});

	elements.lightenBtn.addEventListener('click', () => {
		modeManager(currentColor, 'lighten');
	});

	elements.eraserBtn.addEventListener('click', () => {
		modeManager('rgba(0,0,0,0)');
	});

	// Color Picker
	elements.colorPicker.addEventListener('input', () => {
		currentColor = elements.colorPicker.value;
		modeManager(currentColor);
	});
};

const randomColor = () => {
	const randomR = Math.floor(Math.random() * 255);
	const randomG = Math.floor(Math.random() * 255);
	const randomB = Math.floor(Math.random() * 255);
	const randomAlpha = Math.round(Math.random() * (8 - 3 + 1) + 3) / 10;

	return `rgba(${randomR}, ${randomG}, ${randomB}, ${randomAlpha})`;
};

const rgbToObject = (rgb) => {
	let colors = ['red', 'green', 'blue', 'alpha'];

	let colorArr = rgb.slice(rgb.indexOf('(') + 1, rgb.indexOf(')')).split(', ');

	let obj = new Object();

	colorArr.forEach((color, index) => {
		obj[colors[index]] = color;
	});

	return obj;
};

const alphaManager = (alpha, increments, colorObject) => {
	if (increments) {
		return (alpha += 0.1);
	} else {
		if (isNaN(alpha)) {
			return (colorObject.alpha = 0.9);
		}
		return (alpha -= 0.1);
	}
};

gridGenerate(userInput);
controlsInit();
