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
	// rock(1) beats scissors (3)
	// paper (2) beats rock (1)
	// scissors (3) beat paper (2)
	// or it ties

	if (computerChoice === "rock" && playerChoice === "rock") {
		console.log("its a tie!");
	}
	if (computerChoice === "paper" && playerChoice === "paper") {
		console.log("its a tie!");
	}
	if (computerChoice === "scissors" && playerChoice === "scissors") {
		console.log("its a tie!");
	}
	if (computerChoice === "scissors" && playerChoice === "rock") {
		console.log("Player won!");
	}
	if (computerChoice === "rock" && playerChoice === "scissors") {
		console.log("Computer won!");
	}
	if (computerChoice === "paper" && playerChoice === "rock") {
		console.log("Computer won!");
	}
	if (computerChoice === "rock" && playerChoice === "paper") {
		console.log("Player won!");
	}
	if (computerChoice === "scissors" && playerChoice === "paper") {
		console.log("Computer won!");
	}
	if (computerChoice === "paper" && playerChoice === "scissors") {
		console.log("Player won!");
	}

	console.log(computerChoice, playerChoice);
}

playRound(computerChoice, playerChoice);
