const MAX_SCORE = 5,
  allChoices = ['rock', 'paper', 'scissors'],
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
  },
  COMPUTER_ROUND_SELECTION = ['selected', 'computer-selected'],
  PLAYER_ROUND_SELECTION = ['selected', 'player-selected'];
let playerScore = 0,
  computerScore = 0,
  roundCount = 0;

const playerScorePara = document.querySelector('#player .score p');
const computerScorePara = document.querySelector('#computer .score p');
const playerChoiceImgs = document.querySelectorAll('#player img');
const computerChoices = document.querySelectorAll('#computer img');
const resultModal = document.getElementById('result-modal');
const resultMsg = document.getElementById('result-msg');
const overlay = document.getElementById('overlay');
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', resetGame);
overlay.addEventListener('click', closeResultModal);

function resetGame() {
  roundCount = playerScore = computerScore = 0;
  playerScorePara.textContent = computerScorePara.textContent = 0;
  removeRoundChoiceClass();
  resultModal.classList.remove('active');
  overlay.classList.remove('active');
}

function openResultModal() {
  resultModal.classList.add('active');
  overlay.classList.add('active');
}

function closeResultModal() {
  resultModal.classList.remove('active');
  overlay.classList.remove('active');
}

playerChoiceImgs.forEach((img) =>
  img.addEventListener('click', () => {
    if (isGameOver()) setTimeout(declareResult, 0);
    else {
      const playerChoice = img.alt;
      const computerChoice = getComputerChoice();
      playRound(playerChoice, computerChoice);
    }

    if (isGameOver()) setTimeout(declareResult, 0);
  })
);

function isGameOver() {
  return playerScore === MAX_SCORE || computerScore === MAX_SCORE;
}

function declareResult() {
  openResultModal();
  if (playerScore > computerScore) resultMsg.textContent = 'You Win';
  else if (playerScore < computerScore) resultMsg.textContent = 'You Lose';
  else resultMsg.textContent = 'Tie';
}

function getComputerChoice() {
  let randomChoice = Math.floor(Math.random() * 3);
  return Object.keys(choices)[randomChoice];
}

function playRound(playerChoice, computerChoice) {
  let result = 'tie';
  roundCount++;

  if (choices[playerChoice].beats === computerChoice) result = 'win';
  else if (choices[playerChoice].losesTo === computerChoice) result = 'lose';

  updateRoundChoiceClass(playerChoice, computerChoice);
  updateScore(result);
}

function updateRoundChoiceClass(playerChoice, computerChoice) {
  removeRoundChoiceClass();

  playerChoiceImgs.forEach((img) => {
    if (img.alt === playerChoice) img.classList.add(...PLAYER_ROUND_SELECTION);
  });
  computerChoices.forEach((img) => {
    if (img.alt === computerChoice) img.classList.add(...COMPUTER_ROUND_SELECTION);
  });
}

function removeRoundChoiceClass() {
  playerChoiceImgs.forEach((img) => img.classList.remove(...PLAYER_ROUND_SELECTION));
  computerChoices.forEach((img) => img.classList.remove(...COMPUTER_ROUND_SELECTION));
}

function updateScore(result) {
  if (result === 'win') {
    playerScore++;
    playerScorePara.textContent = playerScore;
  } else if (result === 'lose') {
    computerScore++;
    computerScorePara.textContent = computerScore;
  }
}
