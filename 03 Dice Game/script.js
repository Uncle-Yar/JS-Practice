'use strict'
//put scores into variables for easier using
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
//current score
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceElement = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;

    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
};

init();

//switch player 
const switchPlayer = function () {
    currentScore = document.getElementById(`current--${activePlayer}`).textContent = 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    diceElement.classList.add('hidden');
}

//Roll dice button
btnRoll.addEventListener('click', function () {

    if (playing) {
        //Random number
        const dice = Math.trunc(Math.random() * 6) + 1;

        //set dice img sourse to random number
        diceElement.setAttribute('src', `./images/dice-${dice}.png`);


        //if random number is not 1
        dice !== 1 ?
            //add to the current score
            (currentScore += dice,
                // current0Element.textContent = currentScore) :
                document.getElementById(`current--${activePlayer}`).textContent = currentScore,
                diceElement.classList.remove('hidden')) :
            //else  = reset current score | switch player
            (switchPlayer());
        // console.log(`player ${activePlayer + 1} turn`));
    }
});


btnHold.addEventListener('click', function () {
    if (playing) {
        //add current score to active player's score
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer] += currentScore;
        //check if score >= 100
        //finish game
        scores[activePlayer] >= 20 ? (playing = false,
            diceElement.classList.add('hidden'), document.querySelector(`.player--${activePlayer}`).classList.add('player--winner'),
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'))
            : switchPlayer();
    }
})

btnNew.addEventListener('click', init);