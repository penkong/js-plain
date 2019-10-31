/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer;
init();
// let scores = [0, 0];
// let roundScore = 0;
// let activePlayer = 0;
let dice = Math.floor(Math.random() * 6) + 1;

// DOM manipulate

document.querySelector('#current-' + activePlayer).textContent = dice;
// to put html in selected val ue innerHtml ;
// document.querySelector('#current-' + activePlayer).innerHTML =
//   '<em>' + dice + '</em';

// to read value;
let x = document.querySelector('#score-0').textContent;
// console.log(x);

// onload page hide dice;
document.querySelector('.dice').style.display = 'none';

// events click resizing scrolling down or press key.
// events sit on message queue . after func cleared from doc.
function btn() {}

// get element by id is faster than query selector;
document.querySelector('.btn-roll').addEventListener('click', function() {
  // random number
  let dice = Math.floor(Math.random() * 6) + 1;
  // display result ;
  let diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';
  // update round score if the roll num is not 1
  if (dice !== 1) {
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //
    nextPlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  // add current score to global score of user;
  scores[activePlayer] += roundScore;
  // update the ui ;
  document.getElementById('score-' + activePlayer).textContent =
    scores[activePlayer];

  // check if player won the game ;
  if (scores[activePlayer] >= 100) {
    document.getElementById('name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document
      .querySelector('player-' + activePlayer + '-panel')
      .classList.add('winner');
    document
      .querySelector('player-' + activePlayer + '-panel')
      .classList.remove('active');
  }
  nextPlayer();
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}

//
