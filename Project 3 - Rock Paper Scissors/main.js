let computerChoice = computerPlay();
let playerChoice = playerPlay();

function computerPlay() {
	let value = Math.floor(Math.random() * 3 + 1);
	let computerChose = "";

	switch (value) {
		case 1:
			computerChose = "rock";
			break;
		case 2:
			computerChose = "paper";
			break;
		case 3:
			computerChose = "scissors";
			break;
	}

	return computerChose;
}

function playerPlay() {
	const player = prompt("Enter rock, paper or scissors!").toLowerCase();

	if (player !== "rock" && player !== "paper" && player !== "scissors") {
		setTimeout(() => location.reload(), 500);
		alert("Not valid! Please enter your choice again.");
	}

	return player;
}

function playRound(computerChoice, playerChoice) {
	// Save player choice to variable
	playerRock = playerChoice === "rock";
	playerScissors = playerChoice === "scissors";
	playerPaper = playerChoice === "paper";

	// Save computer choice to variable
	computerRock = computerChoice === "rock";
	computerScissors = computerChoice === "scissors";
	computerPaper = computerChoice === "paper";

	// Game logic

	console.log(`The player chose: ${playerChoice}`);
	console.log(`The computer chose: ${computerChoice}`);

	// Player win conditions
	if ((playerRock && computerScissors) || (playerPaper && computerRock) || (playerScissors && computerPaper))
		console.log("Player wins!");

	// Computer win conditions
	if ((computerRock && playerScissors) || (computerPaper && playerRock) || (computerScissors && playerPaper))
		console.log("Computer Wins!");

	// Tie condition
	if (playerChoice === computerChoice) console.log("It's a tie!");
}

function gameJudge() {}

playRound(computerChoice, playerChoice);
