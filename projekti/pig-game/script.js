'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player1Name = document.getElementById('name--0');
const player2Name = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRename = document.querySelector('.btn--rename-player');

score0El.textContent = 0;
score1El.textContent = 0;

let scores;
let currentScore;
let activePlayer;

let playing;

// Game functionality

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = function () {
  playing = true;
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  diceEl.classList.add('hidden');
  btnRename.classList.remove('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  currentScore = 0;
  scores = [0, 0];

  activePlayer = Math.trunc(Math.random() * 2);
  if (activePlayer === 0) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  } else {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  }
};
init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      alert(`Player ${activePlayer + 1} wins !!!`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
      btnRename.classList.add('hidden');
      diceEl.classList.add('hidden');
    } else switchPlayer();
  }
});

btnRename.addEventListener('click', function () {
  player1Name.textContent = prompt('Player 1, Choose your name!');
  if (player1Name.textContent !== '') {
    alert(
      `Player 1 has sucessfully changed his name to ${player1Name.textContent}`
    );
  } else {
    alert('Name can not be empty string!  \n You have been added default name');
    player1Name.textContent = 'PLAYER 1';
  }
  player2Name.textContent = prompt('Player 2, Choose your name!');
  if (player2Name.textContent !== '') {
    alert(
      `Player 2 has sucessfully changed his name to ${player2Name.textContent}`
    );
  } else {
    alert('Name can not be empty string \n You have been added default name');
    player2Name.textContent = 'PLAYER 2';
  }
});

btnNew.addEventListener('click', init);
