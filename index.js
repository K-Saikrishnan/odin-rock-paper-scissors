const allChoices = ['rock', 'paper', 'scissors'],
  [ROCK, PAPER, SCISSORS] = allChoices,
  choices = {
    rock: {
      beats: SCISSORS,
      losesTo: PAPER,
    },
    paper: {
      beats: ROCK,
      losesTo: SCISSORS,
    },
    scissors: {
      beats: PAPER,
      losesTo: ROCK,
    },
  };

playGame();

function playGame() {
  let playerScore = 0,
    computerScore = 0;

  console.group('Game:');
  for (let i = 0; i < 5; i++) {
    const result = playRound(getPlayerChoice(), getComputerChoice());
    if (result.includes('win')) playerScore++;
    else if (result.includes('lose')) computerScore++;
    else {
      playerScore++;
      computerScore++;
    }
    console.log(result);
  }
  console.groupEnd();

  console.group('Result:');
  if (playerScore > computerScore) console.log(`You win! ${playerScore} to ${computerScore}`);
  else if (playerScore < computerScore) console.log(`You lose! ${computerScore} to ${playerScore}`);
  else console.log(`It's a tie! ${playerScore} to ${computerScore}`);
  console.groupEnd();
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "It's a tie!";
  else if (choices[playerChoice].beats === computerChoice) return `You win! ${playerChoice} beats ${computerChoice}`;
  else if (choices[playerChoice].losesTo === computerChoice) return `You lose! ${computerChoice} beats ${playerChoice}`;
}

function getPlayerChoice() {
  let playerChoice = prompt('Choose Rock, Paper or Scissors:').toLowerCase();
  if (!allChoices.includes(playerChoice)) return getPlayerChoice();
  return playerChoice;
}

function getComputerChoice() {
  let randomChoice = Math.floor(Math.random() * 3);
  return Object.keys(choices)[randomChoice];
}
