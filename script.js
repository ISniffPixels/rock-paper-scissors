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
        const computer_frame_img = document.querySelector('.computer_frame img');

         // REMOVE ANIMATION AND RESET
         computer_frame_img.style.animation = 'none';
         computer_frame_img.offsetHeight;

         // APPLY ANIMATION
         computer_frame_img.style.animation = 'shake 1600ms ease-in';

        if(computerChoice >= 1 && computerChoice <=3) {
            computer_frame_img.src = '/images/rps-rock-hand-left.png';
            setTimeout(()=> {
                computer_frame_img.src = '/images/rps-rock-hand-left.png';
                computer_text.textContent = "Computer chooses Rock!";
            }, 1400)
            return "rock";
        } else if(computerChoice >= 4 && computerChoice <= 6) {
            computer_frame_img.src = '/images/rps-rock-hand-left.png';
            setTimeout(()=> {
                computer_frame_img.src = '/images/rps-paper-hand-left.png';
                computer_text.textContent = "Computer chooses Paper!";
            }, 1400)
            return "paper";
        } else if(computerChoice >= 7 && computerChoice <= 10) {
            computer_frame_img.src = '/images/rps-rock-hand-left.png';
            setTimeout(()=> {
                computer_frame_img.src = '/images/rps-scissors-hand-left.png';
                computer_text.textContent = "Computer chooses Scissors!";
            }, 1400)
            return "scissors";
        }
    }

    function handlePlayerChoice(playerChoice) {
        const player_frame_img = document.querySelector('.player_frame img');

        // REMOVE ANIMATION AND RESET
        player_frame_img.style.animation = 'none';
        player_frame_img.offsetHeight;

        // APPLY ANIMATION
        player_frame_img.style.animation = 'shake 1600ms ease-in';
        
        if(!activeGame) return;

        if(playerChoice === "rock") {
            player_frame_img.src = '/images/rps-rock-hand-right.png';
            setTimeout(()=> {
                player_frame_img.src = '/images/rps-rock-hand-right.png';
            }, 1400)
        } else if(playerChoice === "paper") {
            player_frame_img.src = '/images/rps-rock-hand-right.png';
            setTimeout(()=> {
                player_frame_img.src = '/images/rps-paper-hand-right.png';
            }, 1400)
        } else {
            player_frame_img.src = '/images/rps-rock-hand-right.png';
            setTimeout(()=> {
                player_frame_img.src = '/images/rps-scissors-hand-right.png';
            }, 1400)
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
                    setTimeout(()=> {
                        player_text.textContent = `Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
                        }!`;
                        player_score.textContent = `Player Score: ${gameScore.player}`;
                        computer_score.textContent = `Computer Score: ${gameScore.computer}`;
                        winner_text.textContent = `It's a tie!`;
                    }, 1400);
                        gameScore.player++;
                        gameScore.computer++;
                    
        } else if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
                   (playerChoice === 'paper' && computerChoice === 'rock') ||
                   (playerChoice === 'scissors' && computerChoice === 'paper')){
                    setTimeout(()=> {
                        player_text.textContent = `Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
                        }!`;
                        winner_text.textContent = `You win this round! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)} beats ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}!`;
                        player_score.textContent = `Player Score: ${gameScore.player}`;
                        computer_score.textContent = `Computer Score: ${gameScore.computer}`;
                    }, 1400);
                        gameScore.player++;
        } else {
                setTimeout(()=> {
                    player_text.textContent = `Player chooses ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
                    }!`;
                    winner_text.textContent = `You lose this round! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}!`
                    computer_score.textContent = `Computer Score: ${gameScore.computer}`;
                    player_score.textContent = `Player Score: ${gameScore.player}`;
                }, 1400);   
                    gameScore.computer++
        }
            
        localStorage.setItem('gameScore', JSON.stringify(gameScore));

        // ROUND END
        if(roundEnd) {
            roundEnd(gameScore);
        }
    } 
}

function gameWinner() {
    // BACKGROUND MUSIC
    const music = new Audio('/sounds/glitch_retro_bgm.mp3');
    const mute_btn = document.querySelector('.mute_btn');
    let music_playing = true;

    music.play();
    music.volume = 0.5;

    mute_btn.addEventListener('click', ()=> {
        if(music_playing) {
            music.pause();
            mute_btn.textContent = "MUSIC OFF";
        } else {
            music.play();
            mute_btn.textContent = "MUSIC ON";
        }
        music_playing = !music_playing;
    });

    // SOUND EFFECTS
    const win = new Audio('/sounds/you_win.mp3');
    const lose = new Audio('/sounds/you_lose.mp3');
    const double_ko = new Audio('/sounds/double_ko.mp3');
    const game_over = new Audio('/sounds/game_over.mp3');

    // TEXT ELEMENT DECLARATIONS
    const winner_text = document.querySelector('.winner_text');
    const reset_btn = document.querySelector('.reset_btn');
    const reset_btn_overlay = document.querySelector('.reset_btn_overlay');

    // VARIABLE TO COUNT AMOUNT OF ROUNDS PER TURN FOR FIVE TURNS
    let round=0;
    
    function roundByRound(gameScore) {
        let activeGame = true;
        round++;

        if(round >= 5) {
            activeGame = false;

            if(gameScore.player > gameScore.computer){
                setTimeout(()=> {
                    winner_text.textContent = `You won the RPS Championship of the World!!`
                    music.pause();
                    music.currentTime = 0;
                    win.play();
                }, 1400);
            } else if(gameScore.player < gameScore.computer) {
                setTimeout(()=> {
                    winner_text.textContent = `Computer won the RPS Championship of the World!!`
                    music.pause();
                    music.currentTime = 0;
                    lose.play();
                }, 1400);
            } else {
                setTimeout(()=> {
                    winner_text.textContent = `This bout was scored a DRAW!`
                    music.pause();
                    music.currentTime = 0;
                    double_ko.play();
                }, 1400);
            }

                // DISABLE BUTTONS WHEN GAME HAS CONCLUDED
                const rock = document.querySelector('.rock');
                const paper = document.querySelector('.paper');
                const scissors = document.querySelector('.scissors');
                rock.disabled = true;
                paper.disabled = true;
                scissors.disabled = true;

                // CLEANS GAME SCORE FROM LOCAL STORAGE
                localStorage.clear();
                setTimeout(()=> {
                    reset_btn_overlay.style.display = 'block';
                    music.pause();
                    music.currentTime = 0;
                    game_over.play();
                }, 3000);
            }
        }
        
        // START GAME INVOKING ROUNDBYROUND FUNC AS A CALLBACK IN PLAYGAME FUNC
        playGame(roundByRound);

        reset_btn.addEventListener('click', ()=> {
            window.location.reload()
        });
}

gameWinner();