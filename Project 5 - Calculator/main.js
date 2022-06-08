const calcAdd = (num1, num2) => {
	return num1 + num2;
};

const calcSubstract = (num1, num2) => {
	return num1 - num2;
};

const calcMultiply = (num1, num2) => {
	return num1 * num2;
};

const calcDivide = (num1, num2) => {
	return num1 / num2;
};

const operate = (operator, num1, num2) => {
	switch (operator) {
		case 'add':
			return calcAdd(num1, num2);

		case 'substract':
			return calcSubstract(num1, num2);

		case 'multiply':
			return calcMultiply(num1, num2);

		case 'divide':
			return calcDivide(num1, num2);
	}
};
