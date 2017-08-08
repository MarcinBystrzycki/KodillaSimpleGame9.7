	// JS game structure

var newGameBtn = document.getElementById("js-newGameButton");
var pickRock = document.getElementById("js-playerPick_rock"),
	pickPaper = document.getElementById("js-playerPick_paper"),
	pickScissors = document.getElementById("js-playerPick_scissors");

newGameBtn.addEventListener("click", newGame);

pickRock.addEventListener("click", function() {
	playerPick("rock");
});
pickPaper.addEventListener("click", function() {
	playerPick("paper");
});
pickScissors.addEventListener("click", function() {
	playerPick("scissors");
});

// App logic

	//Initial variables

var gameState = "not started", //started // ended
	player = {
		name: "",
		score: 0
	},
	computer = {
		score: 0
	};

	// Displaying game elements

var newGameElem = document.getElementById("js-newGameElement"),
	pickElem = document.getElementById("js-playerPickElement"),
	resultsElem = document.getElementById("js-resultsTableElement");
	finalScoreElem = document.getElementById("js-finalScoreElement");

function setGameElements() {
	switch(gameState) {
		case "started":
			newGameElem.style.display = "none";
			pickElem.style.display = "block";
			resultsElem.style.display = "block";
			finalScoreElem.style.display = "none";
		break;
		case "ended":
			newGameElem.style.display = "block";
			newGameBtn.innerText = "Play again";
		case "not started":
		default:
			newGameElem.style.display = "block";
			pickElem.style.display = "none";
			resultsElem.style.display = "none";
			finalScoreElem.style.display = "none";
	}
}

setGameElements();

	// Starting the game

var playerPointsElem = document.getElementById("js-playerPoints"),
	playerNameElem = document.getElementById("js-playerName"),
	computerPointsElem = document.getElementById("js-computerPoints");

function newGame() {
	player.name = prompt("Please enter your name", "imię gracza");
	if (player.name) {
		player.score = computer.score = 0;
		gameState = "started";
		setGameElements();

		playerNameElem.innerHTML = player.name;
		setGamePoints();
	}
}

	// Player's pick

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
	checkWhoIsTheWinner();
}

	// Computer's pick

function getComputerPick() {
	var possiblePicks = ["rock", "paper", "scissors"];
	return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById("js-playerPick"),
	computerPickElem = document.getElementById("js-computerPick"),
	playerResultElem = document.getElementById("js-playerResult"),
	computerResultElem = document.getElementById("js-computerResult"),
	finalResultElem = document.getElementById("js-finalResult");

// Game logic and points distribution rules

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = "";

	var winnerIs = "player";

	if (playerPick == computerPick) {
		winnerIs = "noone"; //draw
	} else if (
		(computerPick == "rock" && playerPick == "scissors") || 
		(computerPick == "scissors" && playerPick == "paper") ||
		(computerPick == "paper" && playerPick == "rock")) {

		winnerIs = "computer";
	}

	if (winnerIs == "player") {
		playerResultElem.innerHTML = "Win!";
		player.score++;
		setGamePoints();
	} else if (winnerIs == "computer") {
		computerResultElem.innerHTML = "Win!";
		computer.score++;
		setGamePoints();
	}

}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function checkWhoIsTheWinner() {
	if ((player.score == 10) && (computer.score < 10)) {
		gameState = "ended";
		setGameElements();
		finalResultElem.innerHTML = "You win!";
		finalScoreElem.style.display = "block";
		

	} else if ((computer.score == 10) && (player.score < 10)) {
		gameState = "ended";
		setGameElements();
		finalResultElem.innerHTML = "You lose!";
		finalScoreElem.style.display = "block";

	}
}