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

const playRound = () => {
	const playerChoice = playerPlay();
	const computerChoice = computerPlay();

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

	let playerWon = false;
	let computerWon = false;
	let tied = false;

	// Player win conditions
	if ((playerRock && computerScissors) || (playerPaper && computerRock) || (playerScissors && computerPaper)) {
		console.log('The player wins!');
		playerWon = true;
	}

	// Computer win conditions
	if ((computerRock && playerScissors) || (computerPaper && playerRock) || (computerScissors && playerPaper)) {
		console.log('The computer wins!');
		computerWon = true;
	}

	// Tie condition
	if (playerChoice === computerChoice) {
		console.log(`It's a tie!`);
		tied = true;
	}

	return { playerWon, computerWon, tied };
};

const playGame = () => {
	let roundCounter = 0;
	let playerScore = 0;
	let computerScore = 0;

	while (roundCounter < 5) {
		const { playerWon, computerWon, tied } = playRound();

		if (playerWon) {
			playerScore++;
			roundCounter++;
			console.log(`Player score is: ${playerScore} and its currently the ${roundCounter} round.`);
		}
		if (computerWon) {
			computerScore++;
			roundCounter++;
			console.log(`Computer score is: ${computerScore} and its currently the ${roundCounter} round.`);
		}
		if (tied) {
			console.log(`It's a tie, this round does not count!`);
			continue;
		}
	}

	if (roundCounter === 5) {
		if (playerScore > computerScore) {
			console.log('The Player WON!');
		} else {
			console.log('The Computer WON!');
		}
	}
};

playGame();
