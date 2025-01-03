'use strict';

function playGame(roundEnd) {
    const rock = document.querySelector('.rock');
    const paper = document.querySelector('.paper');
    const scissors = document.querySelector('.scissors');
    let activeGame = true;

    //COMPUTER WILL CHOOSE DEPENDING ON NUMBER OUTCOME
    function getComputerChoice() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function determineComputerChoice(computerChoice) {
        if(computerChoice >= 1 && computerChoice <=3) {
            console.log(`Computer chooses Rock!`);
            return "rock";
        } else if(computerChoice >= 4 && computerChoice <= 6) {
            console.log(`Computer chooses Paper!`);
            return "paper";
        } else if(computerChoice >= 7 && computerChoice <= 10) {
            console.log(`Computer chooses Scissors!`);
            return "scissors";
        }
    }

    function handlePlayerChoice(playerChoice) {
        if(!activeGame) return;
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
        if(!activeGame) return;

        const gameScore = JSON.parse(localStorage.getItem('gameScore')) || {player: 0, computer: 0, both: 0};

        if (playerChoice === computerChoice) {
                    console.log(`Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
                    }!`);
                    gameScore.both++;
                    console.log(`It's a tie!`);
        } else if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
                   (playerChoice === 'paper' && computerChoice === 'rock') ||
                   (playerChoice === 'scissors' && computerChoice === 'paper')){
                     console.log(`Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}!`);
                     console.log(`You win this round! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}!`);
                     gameScore.player++;
                     console.log(`Player Score: ${gameScore.player}`);
                     console.log(`Computer Score: ${gameScore.computer}`);
        } else {
                     console.log(`Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}!`);
                     console.log(`You lose this round! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}!`);
                     gameScore.computer++
                     console.log(`Computer Score: ${gameScore.computer}`);
                     console.log(`Player Score: ${gameScore.player}`);
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
    // VARIABLE TO COUNT AMOUNT OF ROUNDS PER TURN FOR FIVE TURNS
    let round=0;
    
    function roundByRound(gameScore) {
        let activeGame = true;
        round++;

        if(round >= 5) {
            activeGame = false;

            if(gameScore.player > gameScore.computer){
                console.log("You won the RPS Championship of the World!!")
            } else if(gameScore.player < gameScore.computer) {
                console.log("Computer won the RPS Championship of the World!!")
            } else {
                console.log(`This bout was scored a DRAW!`);
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
                console.log("It's all over, Joe, it's all over!. This bout was a barn burner!!");
            } else {
                console.log(`End of round ${round}. Go back to your corners and get ready for the next round!`);
            }
        }

    // START GAME INVOKING ROUNDBYROUND FUNC AS A CALLBACK IN PLAYGAME FUNC
    playGame(roundByRound);
}

gameWinner();