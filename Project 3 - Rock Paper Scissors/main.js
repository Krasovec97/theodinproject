const domElements = {
	roundDisplay: document.querySelector('.round-counter'),
	playerChoiceDisplay: document.querySelector('.player-choice p'),
	computerChoiceDisplay: document.querySelector('.computer-choice p'),
	playerScoreDisplay: document.querySelector('.score .score__player'),
	computerScoreDisplay: document.querySelector('.score .score__computer'),
	playerController: document.querySelector('.player-control'),
};

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

const playRound = (playerChoice) => {
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
	domElements.computerChoiceDisplay.textContent = computerChoice.toUpperCase();
	domElements.playerChoiceDisplay.textContent = playerChoice.toUpperCase();

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
	const data = {
		roundCounter: 0,
		playerScore: 0,
		computerScore: 0,
	};

	const buttons = document.querySelectorAll('.player-options__button');
	buttons.forEach((button) => button.addEventListener('click', () => playerPlay(button.id, data)));
};

const playerPlay = (id, data) => {
	// Invoke the loop
	if (data.roundCounter <= 5) {
		const { playerWon, computerWon, tied } = playRound(id);

		if (playerWon) {
			data.playerScore += 1;
			data.roundCounter += 1;
			domElements.playerScoreDisplay.textContent = data.playerScore;
		}
		if (computerWon) {
			data.computerScore += 1;
			data.roundCounter += 1;
			domElements.computerScoreDisplay.textContent = data.computerScore;
		}
		if (tied) {
			console.log(`It's a tie, this round does not count!`);
		}

		domElements.roundDisplay.textContent = `Round: ${data.roundCounter}`;
	}

	//Check if game is over, return results
	if (data.roundCounter === 5) {
		if (data.playerScore > data.computerScore) {
			return alert('Player won!');
		} else {
			return alert('Computer won!');
		}
	}
};

playGame();
