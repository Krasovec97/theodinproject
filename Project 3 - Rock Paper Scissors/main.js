const domElements = {
	roundDisplay: document.querySelector('.round-counter'),
	playerChoiceDisplay: document.querySelector('.player-choice p'),
	computerChoiceDisplay: document.querySelector('.computer-choice p'),
	playerScoreDisplay: document.querySelector('.score .score__player'),
	computerScoreDisplay: document.querySelector('.score .score__computer'),
	playerController: document.querySelector('.player-control'),
	winScreen: document.querySelector('.win-screen'),
	roundResult: document.querySelector('.round-coutner__round-result'),
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
	buttons.forEach((button) =>
		button.addEventListener('click', () => {
			animate(domElements.playerChoiceDisplay);
			animate(domElements.computerChoiceDisplay);
			return playerPlay(button.id, data);
		})
	);
};

const playerPlay = (id, data) => {
	// Invoke the loop
	if (data.roundCounter <= 5) {
		const { playerWon, computerWon, tied } = playRound(id);

		if (playerWon) {
			data.playerScore += 1;
			data.roundCounter += 1;
			domElements.roundResult.textContent = 'Player won this round!';
			domElements.playerScoreDisplay.textContent = data.playerScore;
		}
		if (computerWon) {
			data.computerScore += 1;
			data.roundCounter += 1;
			domElements.roundResult.textContent = 'Computer won this round!';
			domElements.computerScoreDisplay.textContent = data.computerScore;
		}
		if (tied) {
			domElements.roundResult.textContent = 'Tie! Round does not count!';
		}

		domElements.roundDisplay.textContent = `Round: ${data.roundCounter}`;
	}

	//Check if game is over, return results
	if (data.roundCounter === 5) {
		if (data.playerScore > data.computerScore) {
			// Player won
			domElements.winScreen.classList.remove('hidden');
			domElements.playerController.classList.add('disabled');
			domElements.winScreen.innerHTML = `The player wins!<br>
			<button class="player-options__restart-button">Play Again?</button>`;
			restartGame();
			return;
		} else {
			// Computer won
			domElements.winScreen.classList.remove('hidden');
			domElements.playerController.classList.add('disabled');
			domElements.winScreen.innerHTML = `The computer wins!<br>
			<button class="player-options__restart-button">Play Again?</button>`;
			restartGame();
			return;
		}
	}
};

const restartGame = () => {
	const button = document.querySelector('.player-options__restart-button');
	return button.addEventListener('click', () => location.reload());
};

playGame();

const animate = (choiceDisplay) => {
	return choiceDisplay.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
		duration: 600,
		iterations: 1,
	});
};
