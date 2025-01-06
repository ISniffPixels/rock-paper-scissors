'use strict';

function playGame(roundEnd) {
    // BUTTON ELEMENT DECLARATION
    const rock = document.querySelector('.rock');
    const paper = document.querySelector('.paper');
    const scissors = document.querySelector('.scissors');

    // TEXT ELEMENT DECLARATIONS
    const player_text = document.querySelector('.player_text');
    const computer_text = document.querySelector('.computer_text');
    const winner_text = document.querySelector('.winner_text');

    // PLAYER AND CPU SCORES
    const player_score = document.querySelector('.player_score');
    const computer_score = document.querySelector('.computer_score');

    let activeGame = true;

    //COMPUTER WILL CHOOSE DEPENDING ON NUMBER OUTCOME
    function getComputerChoice() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function determineComputerChoice(computerChoice) {
        if(computerChoice >= 1 && computerChoice <=3) {
            console.log(`Computer chooses Rock!`);
            computer_text.textContent = "Computer chooses Rock!";
            return "rock";
        } else if(computerChoice >= 4 && computerChoice <= 6) {
            console.log(`Computer chooses Paper!`);
            computer_text.textContent = "Computer chooses Paper!";
            return "paper";
        } else if(computerChoice >= 7 && computerChoice <= 10) {
            console.log(`Computer chooses Scissors!`);
            computer_text.textContent = "Computer chooses Scissors!";
            return "scissors";
        }
    }

    function handlePlayerChoice(playerChoice) {
        const player_frame_img = document.querySelector('.player_frame img');

        if(!activeGame) return;

        if(playerChoice === "rock") {
            setTimeout(()=> {
                player_frame_img.src = '/images/rps-rock-hand-left.png';
            }, 1000)
        } else if(playerChoice === "paper") {
            setTimeout(()=> {
                player_frame_img.src = '/images/rps-paper-hand-left.png';
            }, 1000)
        } else {
            setTimeout(()=> {
                player_frame_img.src = '/images/rps-scissors-hand-left.png';
            }, 1000)
        }
        
        const computerChoice = determineComputerChoice(getComputerChoice());
        playRound(playerChoice, computerChoice);
        }
        
    // ATTACHED EVENTLISTENERS TO DEFINED RPS ELEMENTS
    rock.addEventListener('click', () => handlePlayerChoice("rock"));
    paper.addEventListener('click', () => handlePlayerChoice("paper"));
    scissors.addEventListener('click', () => handlePlayerChoice("scissors"));

     // FUNCTION WILL DISABLE BUTTON ONCE GAME CONCLUDES
     function disableButtons() {
        rock.disabled = true;
        paper.disabled = true;
        scissors.disabled = true;
    }

        // DISABLES RPS BUTTONS IF ACTIVEGAME VALUE IS FALSE
        if (!activeGame) {
            disableButtons();
        }

    function playRound(playerChoice, computerChoice) {
        const gameScore = JSON.parse(localStorage.getItem('gameScore')) || {player: 0, computer: 0};
        
        if(!activeGame) return;


        if (playerChoice === computerChoice) {
                    console.log(`Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
                    }!`);
                    player_text.textContent = `Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
                    }!`;
                    gameScore.player++;
                    gameScore.computer++;
                    player_score.textContent = `Player Score: ${gameScore.player}`;
                    computer_score.textContent = `Computer Score: ${gameScore.computer}`;
                    console.log(`It's a tie!`);
                    winner_text.textContent = `It's a tie!`;
                    
        } else if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
                   (playerChoice === 'paper' && computerChoice === 'rock') ||
                   (playerChoice === 'scissors' && computerChoice === 'paper')){
                     console.log(`Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}!`);
                     player_text.textContent = `Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
                     }!`;
                     console.log(`You win this round! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}!`);
                     winner_text.textContent = `You win this round! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}!`;

                     gameScore.player++;
                     console.log(`Player Score: ${gameScore.player}`);
                     player_score.textContent = `Player Score: ${gameScore.player}`;
                     console.log(`Computer Score: ${gameScore.computer}`);
                     computer_score.textContent = `Computer Score: ${gameScore.computer}`;
        } else {
                     console.log(`Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}!`);
                     player_text.textContent = `Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
                     }!`;
                     console.log(`You lose this round! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}!`);
                     winner_text.textContent = `You lose this round! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}!`
                     gameScore.computer++
                     console.log(`Computer Score: ${gameScore.computer}`);
                     computer_score.textContent = `Computer Score: ${gameScore.computer}`;
                     console.log(`Player Score: ${gameScore.player}`);
                     player_score.textContent = `Player Score: ${gameScore.player}`;
        }
            
        localStorage.setItem('gameScore', JSON.stringify(gameScore));
        console.log(gameScore);

        // ROUND END
        if(roundEnd) {
            roundEnd(gameScore);
        }
    } 
}

function gameWinner() {
    // TEXT ELEMENT DECLARATIONS
    const winner_text = document.querySelector('.winner_text');

    // VARIABLE TO COUNT AMOUNT OF ROUNDS PER TURN FOR FIVE TURNS
    let round=0;
    
    function roundByRound(gameScore) {
        let activeGame = true;
        round++;

        if(round >= 5) {
            activeGame = false;

            if(gameScore.player > gameScore.computer){
                console.log("You won the RPS Championship of the World!!")
                winner_text.textContent = `You won the RPS Championship of the World!!`
            } else if(gameScore.player < gameScore.computer) {
                console.log("Computer won the RPS Championship of the World!!")
                winner_text.textContent = `Computer won the RPS Championship of the World!!`
            } else {
                console.log(`This bout was scored a DRAW!`);
                winner_text.textContent = `This bout was scored a DRAW!`
            }

                // Disable buttons and clear game state
                const rock = document.querySelector('.rock');
                const paper = document.querySelector('.paper');
                const scissors = document.querySelector('.scissors');
                rock.disabled = true;
                paper.disabled = true;
                scissors.disabled = true;

                // CLEANS GAME SCORE WHEN GAME IS WON OR LOST
                localStorage.clear();
            } 
        }

    // START GAME INVOKING ROUNDBYROUND FUNC AS A CALLBACK IN PLAYGAME FUNC
    playGame(roundByRound);
}

gameWinner();