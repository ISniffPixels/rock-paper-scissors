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
    let askPlayer = (prompt("Rock, Paper, or Scissors!"))
    if(askPlayer === "") return;
    console.log(`Player chooses ${askPlayer}!`);
    return askPlayer;
}

    function playRound(playerChoice, computerChoice) {
        const HClowerCase = playerChoice.trim().toLowerCase();
    
        if(HClowerCase === "rock" && computerChoice >= 4 && computerChoice <= 6) {
            console.log(`You lose! Paper beats Rock`);
            gameScore.computer++
            console.log(`Computer Score: ${gameScore.computer}`)
            console.log(`Player Score: ${gameScore.player}`)      
        } else if(HClowerCase === "paper" && computerChoice >= 7 && computerChoice <= 10) {
            console.log(`You lose! Scissors beats Paper`);
            gameScore.computer++
            console.log(`Computer Score: ${gameScore.computer}`)
            console.log(`Player Score: ${gameScore.player}`)
        } else if(HClowerCase === "scissors" && computerChoice >= 1 && computerChoice <= 3) {
            console.log(`You lose! Rock beats Scissors`);
            console.log(`Computer Score: ${gameScore.computer}`)
            console.log(`Player Score: ${gameScore.player}`)
            gameScore.computer++
        } else if(HClowerCase === "paper" && computerChoice >= 1 && computerChoice <= 3) {
            console.log(`You win! Paper beats Rock`);
            gameScore.player++
            console.log(`Player Score: ${gameScore.player}`)
            console.log(`Computer Score: ${gameScore.computer}`)
        } else if(HClowerCase === "scissors" && computerChoice >= 4 && computerChoice <= 6) {
            console.log(`You win! Scissors beats Paper`);
            gameScore.player++
            console.log(`Player Score: ${gameScore.player}`)
            console.log(`Computer Score: ${gameScore.computer}`)
        } else if(HClowerCase === "rock" && computerChoice >= 7 && computerChoice <= 10) {
            console.log(`You win! Rock beats Scissors`);
            gameScore.player++
            console.log(`Player Score: ${gameScore.player}`)
            console.log(`Computer Score: ${gameScore.computer}`)
        } 
          else if(HClowerCase === "rock" && computerChoice >= 1 && computerChoice >= 1 && computerChoice <=3) {
            console.log(`It's a tie!`);
            gameScore.both++
            console.log(`Tie: ${gameScore.both}`);
        } 
          else if(HClowerCase === "paper" && computerChoice >= 4 && computerChoice <= 6) {
            console.log(`It's a tie!`);
            gameScore.both++
            console.log(`Tie: ${gameScore.both}`);
        } 
          else if(HClowerCase === "scissors" && computerChoice >= 7 && computerChoice >= 7 && computerChoice <= 10) {
            console.log(`It's a tie!`);
            gameScore.both++
            console.log(`Tie: ${gameScore.both}`);
        } 
          else {
            console.log("Wrong input! Type in Rock, Paper, or Scissors");
        }

        localStorage.setItem('gameScore', JSON.stringify(gameScore));
        console.log(gameScore);

        // GAME OVER FUNCTION CLEARS LOCAL STORAGE
        function gameOver() {
            if(gameScore.player === 5) {
                console.log("You win the game!")
                localStorage.clear()
            }

            else if(gameScore.computer === 5) {
                console.log("Computer wins the game!")
                localStorage.clear()
            }

            else if(gameScore.both === 5 || gameScore.player === 2 && gameScore.computer === 2 && gameScore.both === 1 || gameScore.player === 1 && gameScore.computer === 1 && gameScore.both === 3) {
                console.log(`This game is a DRAW!`)
            }
        }

        gameOver();
    }

    playRound(playerChoice, computerChoice);
}

function winner() {
    let p = 0;
    while(p < 5) {
        playGame();
        p++;
        const gameScore = JSON.parse(localStorage.getItem('gameScore')) || {player: 0, computer: 0};
        if(p === 5 && gameScore.player > gameScore.computer){
            console.log("You won the game!")
        } else if(p === 5 && gameScore.player < gameScore.computer) {
            console.log("Computer won the game!")
        }
    }
    localStorage.clear();
}

winner();
