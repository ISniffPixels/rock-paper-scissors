'use strict';

function playGame() {
    const computerChoice = getComputerChoice();
    const playerChoice = getPlayerChoice();
    let gameScore = JSON.parse(localStorage.getItem('gameScore')) || {player: 0, computer: 0, both: 0};
    
//COMPUTER WILL CHOOSE DEPENDING ON NUMBER OUTCOME
function getComputerChoice() {
    return Math.floor(Math.random() * 10) + 1;
}

// console.log(computerChoice)

if(computerChoice >= 1 && computerChoice <=3) {
    const rock = "Rock";
    console.log(`Computer chooses ${rock}!`);
} else if(computerChoice >= 4 && computerChoice <= 6) {
    const paper = "Paper";
    console.log(`Computer chooses ${paper}!`);
} else if(computerChoice >= 7 && computerChoice <= 10) {
    const scissors = "Scissors";
    console.log(`Computer chooses ${scissors}!`);
}

// PLAYER WILL CHOOSE BASED ON NUMBER OUTCOME
function getPlayerChoice() {
    let askPlayer = (prompt("Enter Rock, Paper, or Scissors into prompt"))
    if(askPlayer === "") location.reload();
    console.log(`Player chooses ${askPlayer}!`);
    return askPlayer;
}

    function playRound(playerChoice, computerChoice) {
        const promptLowerCase = playerChoice.trim().toLowerCase();
    
        if(promptLowerCase === "rock" && computerChoice >= 4 && computerChoice <= 6) {
            console.log(`You lose this round! Paper beats Rock`);
            gameScore.computer++
            console.log(`Computer Score: ${gameScore.computer}`)
            console.log(`Player Score: ${gameScore.player}`)      
        } else if(promptLowerCase === "paper" && computerChoice >= 7 && computerChoice <= 10) {
            console.log(`You lose this round! Scissors beats Paper`);
            gameScore.computer++
            console.log(`Computer Score: ${gameScore.computer}`)
            console.log(`Player Score: ${gameScore.player}`)
        } else if(promptLowerCase === "scissors" && computerChoice >= 1 && computerChoice <= 3) {
            console.log(`You lose this round! Rock beats Scissors`);
            console.log(`Computer Score: ${gameScore.computer}`)
            console.log(`Player Score: ${gameScore.player}`)
            gameScore.computer++
        } else if(promptLowerCase === "paper" && computerChoice >= 1 && computerChoice <= 3) {
            console.log(`You win this round! Paper beats Rock`);
            gameScore.player++
            console.log(`Player Score: ${gameScore.player}`)
            console.log(`Computer Score: ${gameScore.computer}`)
        } else if(promptLowerCase === "scissors" && computerChoice >= 4 && computerChoice <= 6) {
            console.log(`You win this round! Scissors beats Paper`);
            gameScore.player++
            console.log(`Player Score: ${gameScore.player}`)
            console.log(`Computer Score: ${gameScore.computer}`)
        } else if(promptLowerCase === "rock" && computerChoice >= 7 && computerChoice <= 10) {
            console.log(`You win this round! Rock beats Scissors`);
            gameScore.player++
            console.log(`Player Score: ${gameScore.player}`)
            console.log(`Computer Score: ${gameScore.computer}`)
        } 
          else if(promptLowerCase === "rock" && computerChoice >= 1 && computerChoice <=3) {
            console.log(`It's a tie!`);
            gameScore.both++
            console.log(`Tie: ${gameScore.both}`);
        } 
          else if(promptLowerCase === "paper" && computerChoice >= 4 && computerChoice <= 6) {
            console.log(`It's a tie!`);
            gameScore.both++
            console.log(`Tie: ${gameScore.both}`);
        } 
          else if(promptLowerCase === "scissors" && computerChoice >= 7 && computerChoice <= 10) {
            console.log(`It's a tie!`);
            gameScore.both++
            console.log(`Tie: ${gameScore.both}`);
        } 
          else if(promptLowerCase !== "Rock" || "rock" || "Paper" || "paper" || "Scissors" || "scissors") {
              console.log("Wrong input! Type in Rock, Paper, or Scissors");
              location.reload();
        }

        localStorage.setItem('gameScore', JSON.stringify(gameScore));
        console.log(gameScore);
    }

    playRound(playerChoice, computerChoice);
}

function gameWinner() {
    let p = 0;
    while(p < 5) {
        playGame();
        p++;
        const gameScore = JSON.parse(localStorage.getItem('gameScore')) || {player: 0, computer: 0, both: 0};
        if(p === 5 && gameScore.player > gameScore.computer){
            console.log("You won the game!")
        } else if(p === 5 && gameScore.player < gameScore.computer) {
            console.log("Computer won the game!")
        } else if(p === 5 && gameScore.player === gameScore.computer) {
            console.log(`This game is a DRAW!`);
        }
    }
    localStorage.clear();
}

gameWinner();
