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
	console.log(`Player chose: ${playerChoice} & computer chose: ${computerChoice}`);

	let playerWon = false;
	let computerWon = false;
	let tied = false;

	// Player win conditions
	if ((playerRock && computerScissors) || (playerPaper && computerRock) || (playerScissors && computerPaper)) {
		playerWon = true;
	}

	// Computer win conditions
	if ((computerRock && playerScissors) || (computerPaper && playerRock) || (computerScissors && playerPaper)) {
		computerWon = true;
	}

	// Tie condition
	if (playerChoice === computerChoice) {
		tied = true;
	}

	return { playerWon, computerWon, tied };
};

const playGame = () => {
	// Initialize counters
	let roundCounter = 0;
	let playerScore = 0;
	let computerScore = 0;

	// Invoke the loop
	while (roundCounter < 5) {
		const { playerWon, computerWon, tied } = playRound();

		if (playerWon) {
			playerScore++;
			roundCounter++;
			console.log(`Player won! Player score is: ${playerScore} and its currently the ${roundCounter} round.`);
		}
		if (computerWon) {
			computerScore++;
			roundCounter++;
			console.log(`Computer won! Computer score is: ${computerScore} and its currently the ${roundCounter} round.`);
		}
		if (tied) {
			console.log(`It's a tie, this round does not count!`);
			continue;
		}
	}

	//Check if game is over, return results
	if (roundCounter === 5) {
		if (playerScore > computerScore) {
			return alert('Player won!');
		} else {
			return alert('Computer won!');
		}
	}
};

playGame();
