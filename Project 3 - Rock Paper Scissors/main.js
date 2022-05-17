const computerPlay = () => {
	const value = Math.floor(Math.random() * 3 + 1);

	switch (value) {
		case 1:
			return 'rock';
		case 2:
			return 'paper';
		case 3:
			return 'scissors';
	}
};

const playerPlay = () => {
	const player = prompt('Enter rock, paper or scissors!').toLowerCase();
	const options = ['rock', 'paper', 'scissors'];

	if (!options.includes(player)) {
		alert('Not valid! Please enter your choice again.');
		return setTimeout(() => location.reload(), 500);
	}

	return player;
};

const playRound = (playerChoice, computerChoice) => {
	// Save player choice to variable
	playerRock = playerChoice === 'rock';
	playerScissors = playerChoice === 'scissors';
	playerPaper = playerChoice === 'paper';

	// Save computer choice to variable
	computerRock = computerChoice === 'rock';
	computerScissors = computerChoice === 'scissors';
	computerPaper = computerChoice === 'paper';

	// Game logic
	console.log(`The player chose: ${playerChoice}`);
	console.log(`The computer chose: ${computerChoice}`);

	// Player win conditions
	if ((playerRock && computerScissors) || (playerPaper && computerRock) || (playerScissors && computerPaper)) {
		console.log('The player wins!');
		playerWon = true;
		return (playerWon = true);
	}

	// Computer win conditions
	if ((computerRock && playerScissors) || (computerPaper && playerRock) || (computerScissors && playerPaper)) {
		console.log('The computer wins!');
		return (computerWon = true);
	}

	// Tie condition
	if (playerChoice === computerChoice) {
		console.log(`It's a tie!`);
		return (tied = true);
	}
};

const playGame = () => {
	for (let i = 1; i <= 5; i++) {
		const play = playRound(playerPlay(), computerPlay());

		if () {
			console.log('Playgame: PLAYER WON!');
		}

		if () {
			console.log('Playgame: COMPUTER WON!');
		}

		if () {
			console.log('Playgame: PLAYER WON!');
		}
		console.log(play);
	}
};

playGame();
