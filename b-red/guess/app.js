//
let min = 1,
  max = 10,
  winNum = getWinNum(min, max),
  guessLeft = 3;
//
function getWinNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//
const game = document.getElementById('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.getElementById('guess-btn'),
  guessInput = document.getElementById('guess-input'),
  message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;
// play again

game.addEventListener('mousedown', e => {
  if (e.target.className === 'play-again') {
    location.reload();
  }
});

// listen for guess
guessBtn.addEventListener('click', e => {
  //
  let guess = parseInt(guessInput.value);
  // validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter num between ${min} and ${max}`, 'red');
  }

  if (guess === winNum) {
    gameOver(true, `${winNum}`);
  } else {
    //
    guessLeft -= 1;
    if (guessLeft === 0) {
      gameOver(false, 'game over');
    } else {
      guessInput.value = '';
      setMessage(`wrong guess , ${guessLeft} guesses left`, 'red');
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  // disable input;
  guessInput.disabled = true;
  // change ui for win
  guessInput.style.borderColor = color;
  // set message;
  setMessage(msg, color);
  //
  guessBtn.value = 'play again';
  guessBtn.className += 'play-again';
}
