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
		setTimeout(() => location.reload(), 500);
		alert('Not valid! Please enter your choice again.');
	}

	return player;
};

let computerChoice = computerPlay();
let playerChoice = playerPlay();

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
		return 'The player wins!';
	}

	// Computer win conditions
	if ((computerRock && playerScissors) || (computerPaper && playerRock) || (computerScissors && playerPaper)) {
		return 'The computer wins!';
	}

	// Tie condition
	if (playerChoice === computerChoice) {
		return `It's a tie!`;
	}
};

console.log(playRound(playerChoice, computerChoice));

// function playGame() {}
